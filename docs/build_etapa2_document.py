#!/usr/bin/env python3
import os
import shutil
import subprocess
import zipfile
import xml.etree.ElementTree as ET

BASE_DIR = '/home/night/alerta-rs'
DOCS_DIR = os.path.join(BASE_DIR, 'docs')
TEMPLATE_ODT = os.path.join(DOCS_DIR, 'Modelo para Entrega do Projeto IV-A.odt')
OUTPUT_ODT = os.path.join(DOCS_DIR, 'Projeto Integrador IV-A - Etapa 2.odt')
OUTPUT_PDF = os.path.join(DOCS_DIR, 'Projeto Integrador IV-A - Etapa 2.pdf')
WORK_DIR = '/tmp/odt_etapa2_build'

if os.path.exists(WORK_DIR):
    shutil.rmtree(WORK_DIR)
os.makedirs(WORK_DIR, exist_ok=True)

# Unpack base template
subprocess.run(['unzip', '-q', TEMPLATE_ODT, '-d', WORK_DIR], check=True)

# Copy pictures into Pictures/
pictures_dir = os.path.join(WORK_DIR, 'Pictures')
os.makedirs(pictures_dir, exist_ok=True)

images_to_copy = {
    'proto1.png': os.path.join(DOCS_DIR, 'prototipos', 'prototipo-historia-1.png'),
    'proto2.png': os.path.join(DOCS_DIR, 'prototipos', 'prototipo-historia-2.png'),
    'proto3.png': os.path.join(DOCS_DIR, 'prototipos', 'prototipo-historia-3.png'),
    'seq1.png': os.path.join(DOCS_DIR, 'diagramas', 'sequencia-historia-1-painel.png'),
    'seq2.png': os.path.join(DOCS_DIR, 'diagramas', 'sequencia-historia-2-mapa.png'),
    'seq3.png': os.path.join(DOCS_DIR, 'diagramas', 'sequencia-historia-3-detalhes.png'),
    'classes.png': os.path.join(DOCS_DIR, 'diagramas', 'modelo-estrutural-classes.png'),
}

for dest_name, src_path in images_to_copy.items():
    shutil.copy(src_path, os.path.join(pictures_dir, dest_name))

# Update META-INF/manifest.xml
manifest_path = os.path.join(WORK_DIR, 'META-INF', 'manifest.xml')
with open(manifest_path, 'r', encoding='utf-8') as f:
    man_content = f.read()

entries = '\n'.join([f' <manifest:file-entry manifest:full-path="Pictures/{img}" manifest:media-type="image/png"/>' for img in images_to_copy.keys()])
man_content = man_content.replace('</manifest:manifest>', entries + '\n</manifest:manifest>')

with open(manifest_path, 'w', encoding='utf-8') as f:
    f.write(man_content)

# Namespaces
ET.register_namespace('office', 'urn:oasis:names:tc:opendocument:xmlns:office:1.0')
ET.register_namespace('text', 'urn:oasis:names:tc:opendocument:xmlns:text:1.0')
ET.register_namespace('table', 'urn:oasis:names:tc:opendocument:xmlns:table:1.0')
ET.register_namespace('draw', 'urn:oasis:names:tc:opendocument:xmlns:drawing:1.0')
ET.register_namespace('svg', 'urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0')
ET.register_namespace('xlink', 'http://www.w3.org/1999/xlink')
ET.register_namespace('style', 'urn:oasis:names:tc:opendocument:xmlns:style:1.0')
ET.register_namespace('fo', 'urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0')

content_path = os.path.join(WORK_DIR, 'content.xml')
tree = ET.parse(content_path)
root = tree.getroot()

NS = {
    'office': 'urn:oasis:names:tc:opendocument:xmlns:office:1.0',
    'text': 'urn:oasis:names:tc:opendocument:xmlns:text:1.0',
    'table': 'urn:oasis:names:tc:opendocument:xmlns:table:1.0',
    'draw': 'urn:oasis:names:tc:opendocument:xmlns:drawing:1.0',
    'svg': 'urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0',
    'xlink': 'http://www.w3.org/1999/xlink',
}

def make_p(text_content="", style_name="P48"):
    p = ET.Element(f"{{{NS['text']}}}p")
    p.set(f"{{{NS['text']}}}style-name", style_name)
    if text_content:
        p.text = text_content
    return p

def make_img_frame(img_name, width="14.5cm", height="8.2cm", style_name="P48"):
    p = ET.Element(f"{{{NS['text']}}}p")
    p.set(f"{{{NS['text']}}}style-name", style_name)
    frame = ET.SubElement(p, f"{{{NS['draw']}}}frame")
    frame.set(f"{{{NS['draw']}}}name", img_name)
    frame.set(f"{{{NS['text']}}}anchor-type", "as-char")
    frame.set(f"{{{NS['svg']}}}width", width)
    frame.set(f"{{{NS['svg']}}}height", height)
    frame.set(f"{{{NS['draw']}}}z-index", "0")
    img = ET.SubElement(frame, f"{{{NS['draw']}}}image")
    img.set(f"{{{NS['xlink']}}}href", f"Pictures/{img_name}")
    img.set(f"{{{NS['xlink']}}}type", "simple")
    img.set(f"{{{NS['xlink']}}}show", "embed")
    img.set(f"{{{NS['xlink']}}}actuate", "onLoad")
    return p

# 1. Update Paragraphs before tables
body = root.find(f"{{{NS['office']}}}body")
text_elem = body.find(f"{{{NS['office']}}}text")

# Map of paragraph replacements
for p in text_elem.findall(f"{{{NS['text']}}}p"):
    t = ''.join(p.itertext()).strip()
    if 'Aluno 01 (scrum master)' in t:
        p.text = 'Alunos: * Neytan Belisário (scrum master)'
        # Remove spans
        for child in list(p): p.remove(child)
    elif 'Aluno 02 (product owner)' in t:
        p.text = '* João Pedro Castro de Brito (product owner)'
        for child in list(p): p.remove(child)
    elif 'Aluno 03 (desenvolvedor)' in t:
        p.text = '* Arthur Schmidt (desenvolvedor)'
        for child in list(p): p.remove(child)
    elif 'Aluno 04 (desenvolvedor)' in t:
        p.text = '* Gabriel Antoniazzi (desenvolvedor)'
        for child in list(p): p.remove(child)
    elif 'Aluno 05 (desenvolvedor)' in t:
        p.text = '* Sandro Roni Soares (desenvolvedor)'
        for child in list(p): p.remove(child)
    elif 'Aluno 06 (desenvolvedor)' in t:
        # Clear or empty
        p.text = ''
        for child in list(p): p.remove(child)
    elif 'Projeto: Nome do Projeto' in t:
        p.text = 'Projeto: AlertaRS'
        for child in list(p): p.remove(child)
    elif 'O objetivo do aplicativo é...' in t:
        p.text = 'O objetivo do aplicativo é criar uma aplicação web para consultar e exibir informações hidrometeorológicas do estado do Rio Grande do Sul, possibilitando a visualização das estações de monitoramento, níveis dos rios, chuva acumulada e dados históricos por cidade ou bacia hidrográfica.'
        for child in list(p): p.remove(child)
    elif 'Fonte de Dados:' in t:
        p.text = 'Fonte de dados: https://sistemas.defesacivil.rs.gov.br/api-redehidrometeorologica'
        for child in list(p): p.remove(child)
    elif t.startswith('Necessidade 1'):
        p.text = 'Painel de medições atuais (Pontos: 13)'
        for child in list(p): p.remove(child)
    elif t.startswith('Necessidade 2'):
        p.text = 'Mapa de estações do Rio Grande do Sul (Pontos: 13)'
        for child in list(p): p.remove(child)
    elif t.startswith('Necessidade 3'):
        p.text = 'Detalhes da estação (Pontos: 8)'
        for child in list(p): p.remove(child)
    elif t.startswith('Necessidade 4'):
        p.text = 'Histórico de chuvas (Pontos: 8)'
        for child in list(p): p.remove(child)
    elif t.startswith('Necessidade 5'):
        p.text = 'Filtro de estações (Pontos: 5)'
        for child in list(p): p.remove(child)
    elif t == '...':
        p.text = ''
        for child in list(p): p.remove(child)
    elif 'Vídeo de Demonstração da Versão do Software:' in t:
        p.text = 'Vídeo de Demonstração da Versão do Software: (LINK DO YOUTUBE)'
        for child in list(p): p.remove(child)

# Function to configure a story table
def setup_story_table(table, story_num, story_title, backlog_name, desc, pts, tasks, proto_img, seq_img, class_img=None):
    rows = [r for r in table if r.tag.endswith('}table-row')]
    
    # Row 0: História
    c0 = [c for c in rows[0] if c.tag.endswith('}table-cell')][1]
    for child in list(c0): c0.remove(child)
    c0.append(make_p(story_title, "P28"))
    
    # Row 1: Backlog da Sprint
    c1 = [c for c in rows[1] if c.tag.endswith('}table-cell')][1]
    for child in list(c1): c1.remove(child)
    c1.append(make_p(backlog_name, "P30"))
    
    # Row 2: Descrição
    c2 = [c for c in rows[2] if c.tag.endswith('}table-cell')][1]
    for child in list(c2): c2.remove(child)
    c2.append(make_p(desc, "P31"))
    
    # Row 3: Protótipo de Interface
    c3 = [c for c in rows[3] if c.tag.endswith('}table-cell')][1]
    for child in list(c3): c3.remove(child)
    c3.append(make_img_frame(proto_img, width="14.5cm", height="8.0cm"))
    
    # Row 4: Pontuação
    c4 = [c for c in rows[4] if c.tag.endswith('}table-cell')][0]
    for child in list(c4): c4.remove(child)
    c4.append(make_p(f"Pontuação da História: {pts}", "P38"))
    
    # Row 5: Responsável / Tarefa header - keep as is
    
    # Row 6: Task 1
    c6_resp = [c for c in rows[6] if c.tag.endswith('}table-cell')][0]
    c6_task = [c for c in rows[6] if c.tag.endswith('}table-cell')][1]
    for child in list(c6_resp): c6_resp.remove(child)
    for child in list(c6_task): c6_task.remove(child)
    c6_resp.append(make_p(tasks[0][0], "P46"))
    c6_task.append(make_p(tasks[0][1], "P46"))
    
    # Row 7: Task 2
    c7_resp = [c for c in rows[7] if c.tag.endswith('}table-cell')][0]
    c7_task = [c for c in rows[7] if c.tag.endswith('}table-cell')][1]
    for child in list(c7_resp): c7_resp.remove(child)
    for child in list(c7_task): c7_task.remove(child)
    c7_resp.append(make_p(tasks[1][0], "P46"))
    c7_task.append(make_p(tasks[1][1], "P46"))
    
    # Remove extra empty task rows (Row 8 and Row 9) if present
    for extra_row in [rows[8], rows[9]]:
        for c in [c for c in extra_row if c.tag.endswith('}table-cell')]:
            for child in list(c): c.remove(child)
            c.append(make_p("", "P46"))
            
    # Row 11: Modelo Comportamental
    c11 = [c for c in rows[11] if c.tag.endswith('}table-cell')][1]
    for child in list(c11): c11.remove(child)
    c11.append(make_p(f"Diagrama de Sequência UML — História {story_num}: {backlog_name}", "P48"))
    c11.append(make_img_frame(seq_img, width="14.5cm", height="8.2cm"))
    
    # Row 12: Modelo Estrutural
    c12 = [c for c in rows[12] if c.tag.endswith('}table-cell')][1]
    for child in list(c12): c12.remove(child)
    if class_img:
        c12.append(make_p("Diagrama de Classes UML — Modelo Estrutural Unificado da Sprint", "P48"))
        c12.append(make_img_frame(class_img, width="14.5cm", height="9.2cm"))
    else:
        c12.append(make_p("Vide Modelo Estrutural Unificado (Diagrama de Classes UML) apresentado no espaço destinado na História 1, conforme orientações oficiais do Projeto Integrador IV-A.", "P48"))

# Configure Table 1 (História 1)
tables = [t for t in text_elem if t.tag.endswith('}table')]
tabela1 = tables[0]
setup_story_table(
    tabela1,
    story_num=1,
    story_title="Eu, como usuário do AlertaRS, gostaria de visualizar as medições atuais das estações, para acompanhar o nível dos rios e a chuva acumulada.",
    backlog_name="Painel de medições atuais",
    desc="O usuário acessa a tela inicial e encontra uma visão resumida das estações monitoradas, com os valores de nível do rio, chuva acumulada e horário da medição.",
    pts=13,
    tasks=[
        ("Arthur Schmidt", "Implementar a chamada da API e o tratamento dos dados das estações."),
        ("Gabriel Antoniazzi", "Desenvolver o componente visual dos cards de medições.")
    ],
    proto_img="proto1.png",
    seq_img="seq1.png",
    class_img="classes.png"
)

# Configure Table 2 (História 2)
tabela2 = tables[1]
setup_story_table(
    tabela2,
    story_num=2,
    story_title="Eu, como usuário do AlertaRS, gostaria de visualizar as estações em um mapa do Rio Grande do Sul, para localizar os pontos de monitoramento.",
    backlog_name="Mapa de estações",
    desc="O usuário visualiza o mapa do estado com marcadores que representam as estações disponíveis e pode selecionar um marcador para consultar a estação.",
    pts=13,
    tasks=[
        ("Gabriel Antoniazzi", "Desenvolver o mapa do Rio Grande do Sul e posicionar os marcadores usando a latitude e longitude das estações."),
        ("Sandro Roni Soares", "Implementar o clique nos marcadores e encaminhar a estação selecionada para o painel de detalhes.")
    ],
    proto_img="proto2.png",
    seq_img="seq2.png",
    class_img=None
)

# Create Table 3 (História 3) by deep copying Table 2
tabela3 = ET.fromstring(ET.tostring(tabela2))
tabela3.set(f"{{{NS['table']}}}name", "Tabela3")
setup_story_table(
    tabela3,
    story_num=3,
    story_title="Eu, como usuário do AlertaRS, gostaria de abrir os detalhes de uma estação, para consultar suas medições e sua identificação.",
    backlog_name="Detalhes da estação",
    desc="Após selecionar uma estação no painel ou no mapa, o usuário visualiza seu nome, município, código, nível do rio, chuva acumulada e horário da última atualização.",
    pts=8,
    tasks=[
        ("Arthur Schmidt", "Mapear os campos da estação selecionada e preparar os dados para exibição."),
        ("Sandro Roni Soares", "Desenvolver o painel de detalhes e conectá-lo à seleção feita no mapa ou no painel inicial.")
    ],
    proto_img="proto3.png",
    seq_img="seq3.png",
    class_img=None
)

# Insert Tabela3 right after Tabela2 (with an empty paragraph between them)
idx_t2 = list(text_elem).index(tabela2)
sep_p = make_p("", "P19")
text_elem.insert(idx_t2 + 1, sep_p)
text_elem.insert(idx_t2 + 2, tabela3)

# Save updated content.xml
tree.write(content_path, encoding='utf-8', xml_declaration=True)

# Package final ODT
subprocess.run(['zip', '-q', '-r', OUTPUT_ODT, '.'], cwd=WORK_DIR, check=True)
print('Generated ODT:', OUTPUT_ODT)

# Convert to PDF via LibreOffice
res = subprocess.run(['soffice', '--headless', '--convert-to', 'pdf', OUTPUT_ODT, '--outdir', DOCS_DIR], capture_output=True, text=True)
print('Soffice returncode:', res.returncode)
print(res.stdout, res.stderr)
print('Generated PDF:', OUTPUT_PDF)
