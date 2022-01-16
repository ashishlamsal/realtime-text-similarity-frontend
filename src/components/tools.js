import Header from "@editorjs/header";

class Question {

  constructor({ data }) {
    this.data = data;
  }

  static get toolbox() {
    return {
      title: 'Question',
      icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
    };
  }

  render() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('input-wrapper');
    const input = document.createElement('textarea');
    // this.input.classList.add('question-input');

    this.wrapper.appendChild(input);

    input.placeholder = 'Enter your question here';
    input.value = this.data && this.data.url ? this.data.url : '';

    input.addEventListener('keyup', (e) => {
      if (e.shiftKey && e.keyCode == 13) {
        // Request data here
        const data = ["q1", "q2", "q3", "q4", "q5"]
        let list = document.createElement('ul');
        data.forEach((item) => {
          let li = document.createElement('li');
          li.innerText = item;
          li.onclick = ()=>{
            input.value = li.innerText;
            this.wrapper.removeChild(list);
          }
          list.appendChild(li);
        })
        
        this.wrapper.appendChild(list);
      }
    });

    return this.wrapper;
  }

  save(blockContent) {

    const input = blockContent.querySelector('input');

    return {
      question: input.value
    }
  }
}


export const EDITOR_JS_TOOLS = {
  header: Header,
  question: Question,
}