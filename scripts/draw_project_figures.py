"""Draw small, editable SVG system diagrams for the portfolio (no dependencies)."""
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INK, BLUE, TEAL, MUTED = '#263b4a', '#2774a5', '#39877d', '#73838e'
parts = []


def text(x, y, label, size=21, color=INK, anchor='middle'):
    parts.append(f'<text x="{x}" y="{y}" text-anchor="{anchor}" font-family="Arial,Helvetica,sans-serif" font-size="{size}" fill="{color}">{escape(label)}</text>')


def box(x, y, w, h, label='', fill='#f1f6f9', stroke='#9aafbd'):
    parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="5" fill="{fill}" stroke="{stroke}" stroke-width="2"/>')
    if label:
        text(x+w/2, y+h/2+7, label)


def line(points, color=BLUE, arrow=True, dash=False, width=2.5):
    coords = ' '.join(f'{x},{y}' for x,y in points)
    parts.append(f'<polyline points="{coords}" fill="none" stroke="{color}" stroke-width="{width}" stroke-linejoin="round"'+ (' stroke-dasharray="7 6"' if dash else '')+(' marker-end="url(#arrow)"' if arrow else '')+'/>')


def dot(x, y, r=7, fill=BLUE):
    parts.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}"/>')


def document(x, y, label):
    box(x,y,100,112,fill='#fff')
    for offset,length in ((24,58),(42,64),(60,47)):
        line([(x+16,y+offset),(x+16+length,y+offset)],MUTED,False,width=2)
    text(x+50,y+94,label,17)


def start(title, caption):
    parts.clear()
    parts.extend([f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 430" role="img" aria-labelledby="title desc"><title id="title">{escape(title)}</title><desc id="desc">{escape(caption)}</desc>',
      f'<defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto-start-reverse"><path d="M0 0L8 4L0 8" fill="{BLUE}"/></marker></defs>',
      '<rect x="1" y="1" width="718" height="428" rx="8" fill="#fff" stroke="#e0e6ea"/>'])
    text(32,41,title.upper(),17,MUTED,'start')


def save(identifier, caption):
    text(360,403,caption,18,MUTED)
    parts.append('</svg>')
    target=ROOT/f'images/projects/{identifier}.svg'
    target.parent.mkdir(parents=True,exist_ok=True)
    target.write_text('\n'.join(parts),encoding='utf-8')


def draw():
    start('Indoor route planning','Conceptual floor map with a shortest accessible route')
    for x,y,w,h,label in [(48,77,154,110,'Entrance'),(260,77,170,110,'Office'),(492,77,178,110,'Lab'),(48,262,154,92,'Stairs'),(260,262,170,92,'Meeting'),(492,262,178,92,'Storage')]:
        box(x,y,w,h,label,fill='#f8fafb')
    line([(125,187),(125,223),(580,223),(580,187)],arrow=False,color='#c4cfd6',width=13)
    line([(345,187),(345,262)],arrow=False,color='#c4cfd6',width=13)
    line([(125,262),(125,223)],arrow=False,color='#c4cfd6',width=13)
    line([(125,170),(125,223),(580,223),(580,171)],width=5)
    for x,y in [(125,170),(125,223),(345,223),(580,223)]:dot(x,y,6)
    text(350,252,'route graph',16)
    save('indoor-nav','Localize → plan a route → give directions')

    start('Persistent context','Notes are indexed and retrieved for a later session')
    document(45,100,'Session 1');document(72,128,'Session 2')
    line([(178,182),(274,182)])
    box(285,102,160,172,fill='#edf5f4',stroke='#94b5ad')
    for y in (131,157,183):line([(309,y),(419,y)],TEAL,False,width=4)
    text(365,224,'Memory index',19);text(365,252,'persistent storage',15,MUTED)
    line([(446,182),(527,182)])
    box(540,140,137,86,'Context',fill='#eaf3fa')
    box(285,313,160,46,'Query',fill='#fff')
    line([(365,313),(365,281)])
    text(583,264,'ranked matches',17,MUTED)
    save('reflectmemory','Store once · retrieve across sessions')

    start('Adaptive model selection','A routing decision selects a model and consumes quality feedback')
    box(35,175,125,65,'Input',fill='#fff');box(213,152,168,110,'Router',fill='#eaf3fa')
    line([(160,208),(204,208)])
    for y,label in [(72,'Small model'),(177,'Medium model'),(282,'Large model')]:
        box(470,y,203,62,label,fill='#f6f9fb')
        line([(382,208),(422,208),(422,y+31),(461,y+31)])
    line([(572,344),(572,365),(298,365),(298,270)],dash=True)
    text(305,129,'choose + update',17,MUTED)
    text(435,354,'quality / cost feedback',16,TEAL)
    save('flexiflow','Explore alternatives · update from observed rewards')

    start('Autonomous experimentation','Planning, instrument execution, and measurement form a closed loop')
    box(250,75,220,66,'Plan experiment',fill='#eaf3fa')
    box(467,205,205,69,'Run instrument',fill='#f3f7f9')
    box(255,307,220,60,'Measurements',fill='#edf5f4')
    box(45,203,185,69,'Record results',fill='#f3f7f9')
    line([(471,108),(570,108),(570,195)])
    line([(570,275),(570,337),(485,337)])
    line([(253,337),(137,337),(137,282)])
    line([(137,201),(137,108),(240,108)])
    dot(359,235,47,'#f2f5f7');text(359,231,'Provenance',17);text(359,254,'every step',16,MUTED)
    save('trace','Plan → execute → measure → refine')

    start('Reproducible execution','Code, dependencies, and data are captured with a run manifest')
    for y,label in [(88,'Code'),(173,'Dependencies'),(258,'Data references')]:
        box(37,y,184,56,label,fill='#fff');line([(222,y+28),(270,y+28),(270,201),(302,201)])
    box(312,95,191,213,fill='#edf5f4',stroke='#94b5ad')
    box(333,118,150,43,'Environment',fill='#fff')
    box(333,174,150,43,'Run manifest',fill='#fff')
    box(333,230,150,43,'Provenance',fill='#fff')
    line([(505,201),(553,201)])
    box(566,162,120,77,'Replay',fill='#eaf3fa')
    text(406,337,'captured execution',18,MUTED)
    save('reproducible-containers','Capture the context needed to repeat an analysis')

    start('Evidence-based question answering','A question retrieves literature to support a response')
    box(38,85,188,66,'Question',fill='#fff');line([(226,118),(287,118)])
    box(300,85,163,66,'Retrieve',fill='#eaf3fa');line([(465,118),(535,118)])
    document(550,71,'Literature')
    line([(600,184),(600,247),(470,247)])
    box(286,207,178,86,'Generate answer',fill='#edf5f4')
    line([(284,250),(232,250)])
    box(40,215,182,68,'Cited response',fill='#fff')
    text(391,330,'retrieved evidence accompanies the query',17,MUTED)
    save('chatmed','Question + source context → grounded response')

    start('Multilingual sentiment','Language representations support sentiment and intent analysis')
    for y,label in [(79,'Language A'),(171,'Language B'),(263,'Language C')]:
        box(34,y,155,56,label,fill='#fff');line([(190,y+28),(228,y+28),(228,200),(276,200)])
    box(288,137,181,126,fill='#eaf3fa')
    text(378,182,'Multilingual',21);text(378,214,'representation',21)
    line([(470,200),(517,200)])
    for y,label,col in [(97,'Sentiment',BLUE),(243,'Intent',TEAL)]:
        box(530,y,148,66,label,fill='#f4f8fa')
        for j in range(3):dot(563+j*36,y+86,5,col)
    line([(513,200),(513,130),(525,130)])
    line([(513,200),(513,276),(525,276)])
    save('socialsift','Social posts → shared representation → task labels')

    start('Learning to build with LLMs','A curriculum connects concepts, small implementations, and applications')
    for x,y,label,num in [(54,95,'Foundations','01'),(267,185,'Implementation','02'),(478,95,'Applications','03')]:
        box(x,y,185,112,fill='#f4f8fa')
        dot(x+27,y+28,17,'#e0edf6');text(x+27,y+34,num,16,BLUE)
        text(x+92,y+82,label,20)
    line([(147,208),(147,241),(260,241)])
    line([(453,241),(570,241),(570,216)])
    box(188,329,340,40,'Read · implement · experiment',fill='#fff')
    save('learnllm','Concepts become working applications')

    start('Multimodal assistance','Camera frames and speech support scene understanding and spoken guidance')
    box(38,77,215,173,fill='#f6f9fb')
    line([(55,226),(55,170),(102,136),(136,163),(178,111),(236,166)],MUTED,False,width=2)
    box(155,104,56,100,fill='none',stroke=TEAL)
    text(146,279,'camera frame',18,MUTED)
    box(50,315,190,45,'Voice question',fill='#fff')
    line([(254,170),(308,170)])
    line([(241,337),(280,337),(280,234),(309,234)])
    box(321,124,170,147,fill='#eaf3fa');text(406,176,'Scene',22);text(406,205,'understanding',21)
    line([(492,197),(537,197)])
    box(550,151,139,96,fill='#edf5f4');text(619,189,'Spoken',21);text(619,219,'guidance',21)
    save('visionai','Visual context + a question → audio assistance')

    start('Crop assessment','Field images and temporal observations support agricultural analysis')
    for x,y in [(52,92),(91,132),(130,172)]:
        box(x,y,130,108,fill='#f3f8f3',stroke='#a7b9a5')
        parts.append(f'<path d="M{x+32} {y+83}Q{x+29} {y+27} {x+103} {y+20}Q{x+112} {y+80} {x+32} {y+83}Z" fill="#cae0ca" stroke="#6e9c70" stroke-width="2"/>')
        line([(x+33,y+82),(x+91,y+33)],'#6e9c70',False,width=2)
    text(147,321,'field observations',18,MUTED)
    line([(263,220),(305,220)])
    box(318,115,170,78,'Vision features',fill='#edf5f4')
    box(318,244,170,78,'Temporal model',fill='#eaf3fa')
    line([(402,194),(402,235)])
    line([(489,284),(534,284),(534,185),(554,185)])
    box(564,135,122,103,fill='#fff');text(625,178,'Health',20);text(625,207,'& yield',20)
    save('cropinsight','Image features + time → crop assessment')

    start('Book recommendation','Nearest-neighbor retrieval identifies similar items in feature space')
    for i,(x,y) in enumerate([(62,105),(104,129),(146,153)]):
        box(x,y,70,112,fill=['#edf3f8','#edf5f4','#f5f2e9'][i]);line([(x+13,y+19),(x+55,y+19)],MUTED,False)
    text(138,310,'book features',19,MUTED)
    line([(222,211),(278,211)])
    box(290,83,225,245,fill='#fff')
    for x,y in [(320,113),(473,123),(331,286),(485,280),(420,146),(453,199),(423,241)]:dot(x,y,6,'#b6c3cc')
    parts.append('<circle cx="381" cy="205" r="53" fill="#eaf3fa" stroke="#2774a5" stroke-dasharray="6 5"/>')
    for x,y in [(350,180),(407,196),(367,234)]:dot(x,y,8,TEAL)
    dot(381,205,9,BLUE)
    text(402,355,'nearest neighbors',18,MUTED)
    line([(518,211),(552,211)])
    box(563,130,125,55,'Ranked list',fill='#f1f6f9')
    for i in range(3):box(574,201+i*35,105-i*14,20,fill='#dbe9f2',stroke='#dbe9f2')
    save('book-recommendation','Conceptual similarity map · no benchmark data shown')


if __name__ == '__main__':
    draw()
    print('Wrote 11 editable SVG project diagrams.')
