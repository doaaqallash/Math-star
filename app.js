const main=document.querySelector('#main');
const lessons=curriculum.flatMap(([title,icon,page,items],chapter)=>items.map(([name,type,tip,example],index)=>({title,chapter,id:chapter+'-'+index,label:(chapter+1)+'.'+(index+1),name,type,tip,example})));
let progress={};
try{progress=JSON.parse(localStorage.getItem('math-stars-progress'))||{};}catch{}
let route='home',activeChapter=0,activeLesson=0,session=null;
const primary=(label,action)=>'<button class="primary" '+action+'>'+label+'</button>';
const secondary=(label,action)=>'<button class="secondary" '+action+'>'+label+'</button>';
const go=value=>'data-go="'+value+'"';
const glyph=(symbol,gold=false)=>'<span class="glyph'+(gold?' gold':'')+'" aria-hidden="true">'+symbol+'</span>';
const heading=(overline,title)=>'<p class="eyebrow">'+overline+'</p><h2 tabindex="-1">'+title+'</h2>';
const wrap=content=>'<section class="panel">'+content+'</section>';
const back=(label,action)=>'<button class="textbtn back" '+action+'>← '+label+'</button>';
const totalStars=()=>Object.values(progress).reduce((sum,value)=>sum+value.stars,0);
const rows=(chapter,mode='chapter')=>'<div class="grid">'+curriculum.map(([name,icon,page,items],index)=>
 '<button class="card" data-'+mode+'="'+index+'">'+glyph(icon,index%2===1)+'<span><span class="eyebrow">Chapter '+(index+1)+'</span><b>'+name+'</b><small>'+ (mode==='assessment'?'5 questions':items.length+' lessons')+' →</small></span></button>').join('')+'</div>';
const updateHeader=()=>{
 document.querySelector('#stars').textContent=totalStars();
 document.querySelectorAll('nav button').forEach(button=>{
  const active=button.dataset.go===route||(button.dataset.go==='lessons'&&['chapter','lesson'].includes(route))||(route==='quiz'&&button.dataset.go===(session.assessment?'assessments':'practice'));
  if(active) button.setAttribute('aria-current','page');else button.removeAttribute('aria-current');
 });
};
const home=()=>`<section class="hero"><div><span class="pill">✦ Mathematics · Primary 2</span><h1>Ready, set,<em>let’s do math!</em></h1><p>Explore your Term 1 lessons, try a few questions, and collect stars as you learn.</p><div class="actions">${primary('Explore lessons →',go('lessons'))}${secondary('Quick practice',go('practice'))}</div></div><div class="art" aria-hidden="true"><span class="spark one">✦</span><span class="spark two">✧</span><span class="toy plus">+</span><span class="toy equal">=</span><span class="toy num">2</span></div></section>
 <div class="quick"><button ${go('lessons')}>${glyph('▤')}<span><b>Learn a lesson</b><small>Clear steps and worked examples</small></span></button><button ${go('practice')}>${glyph('✎',true)}<span><b>Quick practice</b><small>10 mixed questions</small></span></button><button ${go('assessments')}>${glyph('✓')}<span><b>Chapter assessments</b><small>Check what you know</small></span></button></div>
 <div class="sectionhead"><div>${heading('Term 1 curriculum','Choose a chapter')}</div></div>${rows()}`;
function chapter(){
 const current=curriculum[activeChapter];
 return wrap(back('All chapters',go('lessons'))+heading('Chapter '+(activeChapter+1),current[0])+'<div class="stack">'+lessons.filter(item=>item.chapter===activeChapter).map(item=>'<button class="lesson-row" data-lesson="'+lessons.indexOf(item)+'"><span><small>Lesson '+item.label+'</small><b>'+item.name+'</b></span><span aria-hidden="true">'+(progress[item.id]?'★ ':'')+'→</span></button>').join('')+'</div>');
}
function lesson(){
 const item=lessons[activeLesson];
 return wrap(back(item.title,'data-chapter="'+item.chapter+'"')+heading('Lesson '+item.label,item.name)+'<p>'+item.tip+'</p><div class="example"><strong>Worked example</strong>'+item.example+'</div><div class="actions">'+primary('Practice this lesson →','data-practice="'+activeLesson+'"')+secondary('Listen to the lesson','data-speak="lesson"')+'</div>');
}
function plan(mode,index){
 if(mode==='lesson'){
  const item=lessons[index];
  return {title:item.name,key:item.id,types:Array(5).fill(item.type),assessment:false,mode,index};
 }
 if(mode==='assessment'){
  const types=curriculum[index][3].map(item=>item[1]);
  return {title:curriculum[index][0],key:'assessment-'+index,types:shuffled(types),assessment:true,mode,index};
 }
 return {title:'Quick practice',key:'mixed',types:shuffled(curriculum.map(item=>item[3][integer(0,item[3].length-1)][1])).concat(lessons[integer(0,lessons.length-1)].type),assessment:false,mode,index};
}
function start(mode,index){
 const spec=plan(mode,index);
 const count=mode==='mixed'?10:5;
 const questions=[];
 if(spec.assessment){
  for(const [prompt,answer,explanation,visual] of assessmentSamples[index]) questions.push(question(prompt,answer,explanation,{visual}));
 }
 let tries=0;
 while(questions.length<count){
  const next=generate(spec.types[tries%spec.types.length]);
  tries++;
  if(tries>30||!questions.some(previous=>previous.prompt===next.prompt&&previous.visual===next.visual)) questions.push(next);
 }
 session={...spec,questions,indexInQuiz:0,responses:[],complete:false};
 navigate('quiz');
}
function quiz(){
 const {questions,indexInQuiz,responses,title,assessment}=session;
 const score=responses.filter((answer,index)=>answer===questions[index].answer).length;
 if(session.complete){
  const stars=Math.ceil(score/questions.length*3);
  return wrap(heading('Activity complete',score===questions.length?'Amazing work!':'Well done, Math Star!')+'<div class="score">'+score+' / '+questions.length+'</div><p>'+stars+' out of 3 stars for this attempt.</p><div class="actions">'+primary('Try again','data-retry')+secondary('Back to home',go('home'))+'</div><div class="stack"><h3>Review your answers</h3>'+questions.map((item,index)=>'<div class="example"><strong>'+(index+1)+'. '+item.prompt+'</strong>Your answer: '+escapeHtml(responses[index])+' · Correct answer: '+escapeHtml(item.answer)+'<br>'+escapeHtml(item.explanation)+'</div>').join('')+'</div>');
 }
 const item=questions[indexInQuiz];
 const response=responses[indexInQuiz];
 const answered=response!==undefined;
 return wrap(back(assessment?'Assessments':'Lessons',go(assessment?'assessments':'lessons'))+heading((assessment?'Assessment':'Practice')+' · '+title,'Question '+(indexInQuiz+1)+' of '+questions.length)
 +'<div class="bar" role="progressbar" aria-label="Quiz progress" aria-valuemin="0" aria-valuemax="'+questions.length+'" aria-valuenow="'+responses.length+'"><span style="width:'+(100*responses.length/questions.length)+'%"></span></div>'
 +'<h3>'+escapeHtml(item.prompt)+'</h3>'+(item.visual?'<div class="visual">'+item.visual+'</div>':'')
 +'<div class="options">'+item.options.map((option,index)=>{
  let state='';
  if(answered&&!assessment) state=option===item.answer?' correct':option===response?' incorrect':'';
  return '<button class="option'+state+'" data-answer="'+index+'" '+(answered?'disabled':'')+'>'+escapeHtml(option)+'</button>';
 }).join('')+'</div><p class="feedback" role="status">'+(answered?(assessment?'Answer saved.':'<strong>'+(response===item.answer?'Correct!':'Good try!')+'</strong> '+escapeHtml(item.explanation)):'')+'</p>'
 +'<div class="actions">'+(answered?primary(indexInQuiz===questions.length-1?'See results →':'Next question →','data-next'):'')+secondary('Listen to the question','data-speak="question"')+'</div>');
}
function escapeHtml(value){
 return String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
}
function showProgress(){
 const entries=Object.entries(progress);
 return wrap(heading('Your achievements','My progress')+'<div class="score">★ '+totalStars()+'</div><p>Your best stars from each completed activity. Progress is saved in this browser.</p><div class="stack">'+(entries.length?entries.map(([key,value])=>'<div class="example"><strong>'+escapeHtml(value.title)+'</strong>'+value.correct+' / '+value.total+' correct · '+value.stars+' / 3 stars</div>').join(''):'<p>Finish an activity to earn your first stars.</p>')+'</div>'+primary('Choose a lesson →',go('lessons')));
}
function choosePractice(){
 return wrap(heading('Practice','Try 10 mixed questions')+'<p>Questions from the nine Term 1 chapters. You’ll see an explanation after each answer.</p>'+primary('Start quick practice →','data-mixed'));
}
function showAssessments(){
 return '<div class="sectionhead"><div>'+heading('Term 1','Chapter assessments')+'<p class="notice">Choose a chapter. Answer five questions, then review your score and corrections.</p></div></div>'+rows(0,'assessment');
}
function sources(){
 return wrap(heading('Primary 2 · Term 1','About the lessons')+'<p>Lessons follow the nine chapters of the Ministry of Education and Technical Education’s <em>Primary 2 Mathematics, Term 1</em> (2026–2027).</p><p>Chapter assessments use question patterns and selected adapted examples from <em>Performance Tasks and Assessments, Mathematics, Primary 2, First Term</em>. Practice questions use new numbers and examples.</p><div class="stack">'+curriculum.map(([title,icon,page],index)=>'<div class="example"><strong>Chapter '+(index+1)+' · '+title+'</strong>Student book, printed page '+page+'</div>').join('')+'</div>');
}
const views={home,lessons:()=>'<div class="sectionhead"><div>'+heading('Term 1 curriculum','All chapters')+'</div></div>'+rows(),chapter,lesson,practice:choosePractice,assessments:showAssessments,quiz,progress:showProgress,sources};
function draw(){
 main.innerHTML=views[route]();
 updateHeader();
}
function navigate(screen){
 route=screen;
 draw();
 window.scrollTo(0,0);
 main.focus({preventScroll:true});
}
function finish(){
 const best=progress[session.key];
 const correct=session.responses.filter((answer,index)=>answer===session.questions[index].answer).length;
 const total=session.questions.length;
 if(!best||correct>=best.correct){
  progress[session.key]={title:session.title+(session.assessment?' assessment':''),correct,total,stars:Math.ceil(correct/total*3)};
  try{localStorage.setItem('math-stars-progress',JSON.stringify(progress));}catch{}
 }
 session.complete=true;
 navigate('quiz');
}
document.addEventListener('click',event=>{
 const button=event.target.closest('button');
 if(!button) return;
 const data=button.dataset;
 if(data.go){navigate(data.go);return;}
 if(data.chapter!==undefined){activeChapter=Number(data.chapter);navigate('chapter');return;}
 if(data.lesson!==undefined){activeLesson=Number(data.lesson);navigate('lesson');return;}
 if(data.practice!==undefined){start('lesson',Number(data.practice));return;}
 if(data.assessment!==undefined){start('assessment',Number(data.assessment));return;}
 if(data.mixed!==undefined){start('mixed',0);return;}
 if(data.retry!==undefined){start(session.mode,session.index);return;}
 if(data.answer!==undefined){
  if(session.responses.length!==session.indexInQuiz) return;
  session.responses.push(session.questions[session.indexInQuiz].options[Number(data.answer)]);
  draw();
  main.querySelector('[data-next]').focus();
  return;
 }
 if(data.next!==undefined){
  if(session.indexInQuiz+1===session.questions.length){finish();return;}
  session.indexInQuiz++;
  navigate('quiz');
  return;
 }
 if(data.speak){
  if(!('speechSynthesis' in window)){button.textContent='Audio unavailable';return;}
  const item=lessons[activeLesson];
  const text=data.speak==='lesson'?item.name+'. '+item.tip+' Example. '+item.example:session.questions[session.indexInQuiz].prompt;
  speechSynthesis.cancel();
  const speech=new SpeechSynthesisUtterance(text);
  speech.lang='en-GB';
  speech.rate=.85;
  speechSynthesis.speak(speech);
 }
});
draw();
if('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(()=>{});
