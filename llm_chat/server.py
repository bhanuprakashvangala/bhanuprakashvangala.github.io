import os
import glob
from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer
from transformers import AutoModelForCausalLM, AutoTokenizer
import faiss


def load_documents(paths):
    docs = []
    for path in paths:
        with open(path, 'r', encoding='utf-8') as f:
            text = f.read()
        for chunk in text.split('\n\n'):
            chunk = chunk.strip()
            if chunk:
                docs.append((path, chunk))
    return docs


def build_index(docs, embed_model):
    embeddings = embed_model.encode([d[1] for d in docs], show_progress_bar=True)
    index = faiss.IndexFlatL2(embeddings.shape[1])
    index.add(embeddings)
    return index


def search(query, docs, index, embed_model, k=3):
    q_emb = embed_model.encode([query])
    D, I = index.search(q_emb, k)
    return [docs[i] for i in I[0]]


app = Flask(__name__)

embed_model = SentenceTransformer('all-MiniLM-L6-v2')
llm_name = os.environ.get('LLM_MODEL', 'distilgpt2')
tokenizer = AutoTokenizer.from_pretrained(llm_name)
model = AutoModelForCausalLM.from_pretrained(llm_name)

paths = glob.glob('_pages/*.md') + glob.glob('*.md')
docs = load_documents(paths)
index = build_index(docs, embed_model)


@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json() or {}
    query = data.get('query', '')
    if not query:
        return jsonify({'answer': ''})
    segments = search(query, docs, index, embed_model)
    context = '\n'.join([seg[1] for seg in segments])
    prompt = f"Answer the question using only the information below:\n{context}\nQuestion: {query}\nAnswer:"
    inputs = tokenizer(prompt, return_tensors='pt')
    outputs = model.generate(**inputs, max_new_tokens=150)
    answer = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return jsonify({'answer': answer})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
