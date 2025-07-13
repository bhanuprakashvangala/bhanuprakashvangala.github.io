import os, re, json

def load_context():
    context = []
    for root, dirs, files in os.walk('_pages'):
        for fname in files:
            if fname.endswith('.md'):
                with open(os.path.join(root, fname), 'r', encoding='utf-8') as f:
                    text = f.read()
                    text = re.sub(r'<[^>]+>', ' ', text)
                    text = re.sub(r'`{3}.*?`{3}', ' ', text, flags=re.S)
                    text = re.sub(r'\s+', ' ', text)
                    context.append(text)
    return ' '.join(context)

if __name__ == '__main__':
    ctx = load_context()
    os.makedirs('assets', exist_ok=True)
    with open('assets/qa_context.txt', 'w', encoding='utf-8') as f:
        f.write(ctx)
