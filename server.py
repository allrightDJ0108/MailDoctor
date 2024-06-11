from flask import Flask
from flask import request
import torch
import json
from transformers import T5ForConditionalGeneration, T5Tokenizer, pipeline
app = Flask(__name__)
@app.route("/", methods=['GET', 'POST'])
def hello_world():
    print(request.get_json())
    # JSON 데이터 파싱
    json_data_bytes = request.data
    json_data_string = json_data_bytes.decode('utf-8')
    json_data = json.loads(json_data_string)
    # 'value' 필드의 값을 읽어오기
    value = json_data.get('word')  # 혹은 json_data['value']
    # 값 출력
    print("value 값:", value)
    # json_data_bytes = request.data
    # # 바이트를 문자열로 디코딩
    # json_data_string = json_data_bytes.decode('utf-8')
    # # 디코딩된 문자열 출력
    # print("JSON 데이터:", json_data_string)
    # # 'value' 필드의 값을 읽어오기
    # value = json_data_string.get('word')  # 혹은 json_data['value']
    # # 값 출력
    # print("value 값:", value)
    # 모델 로직 함수 호출
    print(check_spell(value))
    return check_spell(value)
    # return "hello"
def check_spell(word):
    # T5 모델 로드
    model = T5ForConditionalGeneration.from_pretrained("j5ng/et5-typos-corrector")
    tokenizer = T5Tokenizer.from_pretrained("j5ng/et5-typos-corrector")
    device = "cuda:0" if torch.cuda.is_available() else "cpu"
    # device = "mps:0" if torch.cuda.is_available() else "cpu" # for mac m1
    model = model.to(device)
    # 예시 입력 문장
    input_text = word
    # 입력 문장 인코딩
    input_encoding = tokenizer("맞춤법을 고쳐주세요: " + input_text, return_tensors="pt")
    input_ids = input_encoding.input_ids.to(device)
    attention_mask = input_encoding.attention_mask.to(device)
    # T5 모델 출력 생성
    output_encoding = model.generate(
        input_ids=input_ids,
        attention_mask=attention_mask,
        max_length=128,
        num_beams=5,
        early_stopping=True,
    )
    # 출력 문장 디코딩
    output_text = tokenizer.decode(output_encoding[0], skip_special_tokens=True)
    # 결과 출력
    return output_text # 아니 진짜 뭐 하냐고.
# 0.0.0.0 으로 모든 IP에 대한 연결을 허용해놓고 포트는 8082로 설정
if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)