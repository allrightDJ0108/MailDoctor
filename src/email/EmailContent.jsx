import React, { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import Button from '@mui/material/Button';
import './EmailContent.css'; // 추가된 CSS 파일 임포트
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: '#8C8C8C', // 회색 배경색 지정
    color:'white',
    padding: theme.spacing(1),
    width: '5%',
    textAlign: 'center',
  }));

  const SubDiv = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: '#8C8C8C', // 회색 배경색 지정
    color:'white',
    padding: theme.spacing(1),
    width: '3%',
    textAlign: 'center',
  }));

function EmailContent() {
  const [emailTo, setEmailTo] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [spellCheckResults, setSpellCheckResults] = useState([]);
  const [isSpellChecked, setIsSpellChecked] = useState(false);
  const editorRef = useRef();

  const handleSpellCheck = async () => {
    try {
        console.log("OK");
      const editorInstance = editorRef.current.getInstance();
      const emailBody = editorInstance.getMarkdown();
    //   http://192.168.0.134:8080/mail
      const response = await fetch('http://172.31.50.111:8080/mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ contents: emailBody })
      });
      const result = await response.json();
      console.log(result);
      setSpellCheckResults(result);
      setIsSpellChecked(true); // 맞춤법 검사 버튼 클릭 후 상태 업데이트
    } catch (error) {
      alert('맞춤법 검사 중 오류가 발생했습니다.');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <nav className="navbar">
        <ul>
          <li>보내기</li>
          <li>임시저장</li>
          <li>인쇄</li>
          <li>숨은참조</li>
          <li>이름확인</li>
          <li>파일첨부</li>
          <li>메일옵션</li>
          <li>간편주소록 설정</li>
          <li onClick={handleSpellCheck}>맞춤법 검사</li>
        </ul>
      </nav>

      <main className="email-content">
      <div className="email-body">
        <div className="email-row">
            <Div>받는사람</Div>
            <TextField 
            id="outlined-basic" 
            variant="outlined" 
            fullWidth 
            value={emailTo}
            onChange={(e) => setEmailTo(e.target.value)}
            className="email-input"
            size="small"
            />
            <SubDiv>+</SubDiv>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">간편주소록</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    label="간편주소록"
                >
                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                </Select>
            </FormControl>
        </div>
        <div className="email-row">
            <Div>참조</Div>
            <TextField 
            id="outlined-basic" 
            variant="outlined" 
            fullWidth 
            value={emailTo}
            onChange={(e) => setEmailTo(e.target.value)}
            className="email-input"
            size="small"
            />
            <SubDiv>+</SubDiv>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">간편주소록</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    label="간편주소록"
                >
                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                </Select>
            </FormControl>
        </div>
        <div className="email-row">
            <Div>제목</Div>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">말머리</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    label="말머리"
                >
                    <MenuItem value="">
                    <em>없음</em>
                    </MenuItem>
                </Select>
            </FormControl>
            <TextField 
            id="outlined-basic" 
            variant="outlined" 
            fullWidth 
            value={emailTo}
            onChange={(e) => setEmailTo(e.target.value)}
            className="email-input"
            size="small"
            />
        </div>
        
        </div>
        <div className="email-editor">
          <Editor
            ref={editorRef}
            initialValue="내용을 입력하세요."
            previewStyle="vertical"
            height="300px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            className="editor"
          />
        </div>
        {/* <div className="email-footer">
          <Button variant="contained">전송하기</Button>
          <Button variant="outlined">임시저장</Button>
          <Button variant="outlined" onClick={handleSpellCheck}>맞춤법 검사</Button>
        </div> */}
        {isSpellChecked && (
          <div className="spellcheck-results">
            <h3>맞춤법 검사 결과:</h3>
            {spellCheckResults.length > 0 ? (
              <ul>
                {spellCheckResults.map((item, index) => (
                  <li key={index}>
                    <span className="original">{item.original}</span> ➔ <span className="corrected">{item.corrected}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>오타가 없습니다</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default EmailContent;
