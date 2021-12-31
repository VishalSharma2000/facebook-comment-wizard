const comment = {

}

const getInputForm = (submitCallback, cancelCallback) => {
  const card = document.createElement('div');
  const input = document.createElement('input');
  const br = document.createElement('br');
  const submitButton = document.createElement('button');
  const cancelButton = document.createElement('button');

  input.setAttribute('type', 'text');
  submitButton.innerText = "Submit";
  cancelButton.innerText = "Cancel";

  card.appendChild(input);
  card.appendChild(br);
  card.appendChild(submitButton);
  card.appendChild(cancelButton);

  submitButton.addEventListener('click', () => {
    submitCallback(input.value);
  });
  cancelButton.addEventListener('click', () => {
    cancelCallback();
  })

  return card;
}

const handleOnClickReplyButton = (parentId) => {
  const { replyButton: replyButtonId, replyDiv: replyDivId } = comment[parentId];
  const replyButton = document.getElementById(replyButtonId);

  const inputForm = getInputForm((value) => {
    inputForm.replaceWith(replyButton);

    createComment(value, parentId);
  }, () => {
    inputForm.replaceWith(replyButton);
  });

  replyButton.replaceWith(inputForm);
}

const createNewCommentDiv = (description) => {
  const card = document.createElement('div');
  const title = document.createElement('p');
  const textNode = document.createTextNode(description);
  const replyButton = document.createElement('button');
  const replyDiv = document.createElement('div');

  card.setAttribute('id', Math.random());
  replyDiv.setAttribute('id', Math.random());
  replyButton.setAttribute('id', Math.random());
  replyButton.innerHTML = "Reply";
  title.appendChild(textNode);

  card.appendChild(title);
  card.appendChild(replyButton);
  card.appendChild(replyDiv);

  comment[card.getAttribute('id')] = {
    'replyDiv': replyDiv.getAttribute('id'),
    'replyButton': replyButton.getAttribute('id')
  }

  replyButton.addEventListener('click', () => {
    handleOnClickReplyButton(card.getAttribute('id'));
  });

  return card;
}

const createComment = (description, parentId = 'root') => {
  const commentDiv = createNewCommentDiv(description);
  const parentDiv = document.getElementById(parentId);

  if(parentId === 'root') {
    parentDiv.appendChild(commentDiv);
    return;
  } 

  const marginLeft = Number(parentDiv.style.marginLeft?.slice(0, -2)) || 10;
  console.log('margin left', marginLeft)
  commentDiv.style.marginLeft =  (marginLeft + 10) + "px";

  const parentReplyDivId = comment[parentId].replyDiv;
  const parentReplyDiv = document.getElementById(parentReplyDivId);

  parentReplyDiv.appendChild(commentDiv);
};

createComment('This is first comment');






































// const comments = [
//   {
//     id: 1,
//     description: "This is the first comment",
//     reply: [] 
//   }
// ]

// let value = 1;
// const root = document.getElementById('root');
// root.style.marginLeft = '10px';

// const createCommentDiv = (comment, parent) => {
//   const newCommentDiv = document.createElement('div');
//   newCommentDiv.setAttribute('id', value);
//   let marginLeft = parent.style.marginLeft;
//   let len = marginLeft.length;
//   let marginLeftInt = Number(marginLeft.substr(0, len-2))
//   newCommentDiv.style.marginLeft = (marginLeftInt + 10) + "px";

//   const newCommentPara = document.createElement('p');
//   const newCommentText = document.createTextNode(comment.description);
//   newCommentPara.appendChild(newCommentText);
  
//   const newCommentButton = document.createElement('button');
//   newCommentButton.innerHTML = 'Reply';

//   newCommentButton.addEventListener('click', (event) => {
//     const parentDivId = event.path[1].id;
//     handleClickEventOnButton(parentDivId);
//   });

//   newCommentDiv.appendChild(newCommentPara);
//   newCommentDiv.appendChild(newCommentButton);

//   root.insertAfter(parent, newCommentDiv);

//   value++;
// }

// comments.forEach(comment => {
//   createCommentDiv(comment, root);
// });

// function handleClickEventOnButton (targetDivId) {
//   console.log(targetDivId);
//   const newDiv = document.createElement('div');
//   const inputElement = document.createElement('input');
//   const submitButton = document.createElement('button');
//   submitButton.innerHTML = "Submit";

//   newDiv.appendChild(inputElement);
//   newDiv.appendChild(submitButton);
  
//   console.log(newDiv);

//   const parentDiv = document.getElementById(targetDivId);
  
//   console.log(parentDiv);
  
//   const buttonEle = parentDiv.lastChild;
//   buttonEle.replaceWith(newDiv);

//   const handleSubmitComment = () => {
//     createCommentDiv({
//       id: Math.random(),
//       description: inputElement.value,
//     }, parentDiv);

//     newDiv.replaceWith(buttonEle);
//   };

//   submitButton.addEventListener('click', handleSubmitComment);
// };