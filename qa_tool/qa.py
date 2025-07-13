import os
import re
from transformers import pipeline

def load_context():
    context = []
    for root, dirs, files in os.walk('_pages'):
        for fname in files:
            if fname.endswith('.md'):
                with open(os.path.join(root, fname), 'r', encoding='utf-8') as f:
                    text = f.read()
                    # remove code fences and HTML tags
                    text = re.sub(r'<[^>]+>', ' ', text)
                    text = re.sub(r'`{3}.*?`{3}', ' ', text, flags=re.S)
                    text = re.sub(r'\s+', ' ', text)
                    context.append(text)
    return ' '.join(context)

def answer_question(question, context):
    qa = pipeline('question-answering', model='distilbert-base-cased-distilled-squad')
    result = qa(question=question, context=context)
    return result['answer']

if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser(description='Answer questions based on site content')
    parser.add_argument('question', nargs='*', help='Question to ask')
    args = parser.parse_args()
    if args.question:
        question = ' '.join(args.question)
    else:
        question = input('Question: ')
    context = load_context()
    print(answer_question(question, context))
