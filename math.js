const curriculum = [
 ['Graphs and Charts','▥',4,[
  ['Make a graph','graph','Count each group. Put one block in the graph for each item.','4 apples need 4 blocks.'],
  ['Read graphs and charts','graph','Read the label and count the blocks above it.','If Pear has 6 blocks, 6 children chose pear.'],
  ['Compare graphs','compareGraph','To find how many more, subtract the smaller count from the larger count.','6 votes − 2 votes = 4 more votes.']]],
 ['Vertical Addition','+',16,[
  ['Add without regrouping','add','Line up the tens and ones. Add the ones first, then the tens.','24 + 13 = 37.'],
  ['Regroup 10 ones','carry','When the ones add up to 10 or more, trade 10 ones for 1 ten.','27 + 15 = 42.'],
  ['Add across tens','carry','Write the leftover ones and carry the new ten to the tens column.','36 + 18 = 54.'],
  ['Add a one-digit number','addOne','Place the one-digit number under the ones column.','38 + 6 = 44.'],
  ['Addition stories','addStory','Find the two groups and add them to find how many there are altogether.','18 pencils + 17 pencils = 35 pencils.']]],
 ['Vertical Subtraction','−',30,[
  ['Subtract without regrouping','subtract','Line up the digits by place value and subtract the ones first.','57 − 24 = 33.'],
  ['Regroup 1 ten','borrow','If you need more ones, trade 1 ten for 10 ones.','42 − 15 = 27.'],
  ['Subtract from a multiple of 10','borrowZero','Trade one ten for 10 ones when the top number ends in zero and you need to subtract ones.','60 − 18 = 42.'],
  ['Subtraction stories','subtractStory','Subtract to find what is left or how many more.','35 stickers − 12 stickers = 23 stickers.'],
  ['Addition and subtraction facts','inverse','Use addition to check a subtraction answer.','52 − 29 = 23, so 23 + 29 = 52.']]],
 ['Time and Duration','◷',48,[
  ['Read a clock','clock','The short hand shows the hour. Each number the long hand passes counts as 5 minutes.','At 3:15 the minute hand points to 3.'],
  ['Work out the duration','duration','Count the minutes from the starting time to the ending time.','From 2:10 to 2:35 is 25 minutes.']]],
 ['Units of Length','↔',56,[
  ['Centimeters','cm','A centimeter is a unit for measuring short lengths.','A small eraser might be 4 cm long.'],
  ['Millimeters','mm','There are 10 millimeters in 1 centimeter.','3 cm = 30 mm.'],
  ['Centimeters and millimeters','mixedLength','Convert the centimeters to millimeters, then add the extra millimeters.','4 cm 2 mm = 42 mm.'],
  ['Measure a line','line','Find a line’s length by subtracting the start mark from the end mark.','From 2 cm to 9 cm is 7 cm.'],
  ['Calculate lengths','lengthSum','Use the same unit before adding or subtracting lengths.','16 cm + 12 cm = 28 cm.']]],
 ['Numbers Bigger than 100','123',68,[
  ['Count hundreds','hundreds','A hundred means ten groups of ten.','5 hundreds = 500.'],
  ['Hundreds and tens','hundredsTens','Add the value of the hundreds to the value of the tens.','4 hundreds and 7 tens make 470.'],
  ['Hundreds, tens and ones','place','A three-digit number has a hundreds, tens and ones place.','342 = 300 + 40 + 2.'],
  ['The value of a digit','value','The tens digit tells you how many groups of ten are in a number.','In 386, the value of 8 is 80.'],
  ['Build a number','expanded','Add the values of the digits to build a number.','600 + 20 + 3 = 623.'],
  ['Count by tens','sequence','Add 10 to find the next number when counting by tens.','230, 240, 250, 260.'],
  ['Count groups of ten','tensGroups','Count how many groups of 10 fit in the number.','320 is 32 tens.'],
  ['Add and subtract place values','placeCalc','Add or subtract a place value by looking at the correct column.','570 − 70 = 500.'],
  ['Compare three-digit numbers','compare','Compare the hundreds first, then tens, then ones.','481 > 419.'],
  ['Compare expressions','compareExpression','Calculate each side before you choose <, > or =.','540 − 40 = 500.']]],
 ['Units of Capacity','◒',98,[
  ['Deciliters','dl','Capacity tells how much a container can hold. Deciliters are written dL.','A jug with 6 dL holds more than a cup with 2 dL.'],
  ['Liters and deciliters','liters','One liter is equal to ten deciliters.','3 L 4 dL = 34 dL.'],
  ['Milliliters','ml','One deciliter equals 100 milliliters, and one liter equals 1,000 milliliters.','5 dL = 500 mL.']]],
 ['Vertical Addition and Subtraction','±',104,[
  ['Add three-digit numbers','addBig','Line up hundreds, tens and ones. Start with the ones.','321 + 146 = 467.'],
  ['Regroup in addition','carryBig','Trade 10 ones for a ten or 10 tens for a hundred.','267 + 158 = 425.'],
  ['Addition stories with hundreds','addBigStory','Combine the two amounts using vertical addition.','236 books + 148 books = 384 books.'],
  ['Subtract three-digit numbers','subtractBig','Subtract ones, then tens, then hundreds.','573 − 241 = 332.'],
  ['Regroup in subtraction','borrowBig','Trade from the next place when there are too few in a column.','452 − 178 = 274.'],
  ['Subtraction stories with hundreds','subtractBigStory','Subtract what was taken away from the starting total.','350 bottles − 125 bottles = 225 bottles.']]],
 ['Mental Math Strategies','✦',118,[
  ['Group numbers to add','group','Look for two numbers that add up to a multiple of ten. Add those first.','8 + (13 + 7) = 8 + 20 = 28.'],
  ['Make a ten','mental','Round to a nearby ten and adjust the answer.','39 + 6 = 40 + 6 − 1 = 45.']]]
];

function integer(min,max){return min+Math.floor(Math.random()*(max-min+1));}
function shuffled(items){
 const result=[...items];
 for(let index=result.length-1;index>0;index--){
  const other=integer(0,index);
  [result[index],result[other]]=[result[other],result[index]];
 }
 return result;
}
function question(prompt,answer,explanation,{choices,visual='',step=1}={}){
 const pool=choices??[answer, Math.max(0,answer-step),answer+step,answer+step*2,answer+step*3];
 return {prompt,answer:String(answer),explanation,visual,options:shuffled([...new Set(pool.map(String))].slice(0,4))};
}
function vertical(a,b,sign){
 const width=String(a).length+2;
 return '<pre class="vertical" aria-hidden="true">'+String(a).padStart(width)+'\n'+sign+String(b).padStart(width-1)+'\n'+'─'.repeat(width)+'</pre>';
}
function generate(type){
 const n=integer(2,8), m=integer(1,9), h=integer(1,8), k=integer(1,8);
 const math=(a,b,subtract=false,story=false)=>{
  const sign=subtract?'−':'+';
  const result=subtract?a-b:a+b;
  const equation=a+' '+sign+' '+b;
  const prompt=story
   ? subtract ? 'There are '+a+' books on a shelf. Students borrow '+b+'. How many books are left?' : 'A class collects '+a+' stickers on Monday and '+b+' on Tuesday. How many are there altogether?'
   : 'Calculate '+equation+'.';
  return question(prompt,result,equation+' = '+result+'.',{visual:story?'':vertical(a,b,sign)});
 };
 const unit=(prompt,answer,label,step=1)=>{
  const choices=[answer,Math.max(0,answer-step),answer+step,answer+step*2,answer+step*3];
  return question(prompt,answer+' '+label,'The answer is '+answer+' '+label+'.',{choices:[...new Set(choices)].slice(0,4).map(value=>value+' '+label)});
 };
 const compare=(a,b,left=a,right=b)=>{
  const sign=a===b?'=':a>b?'>':'<';
  return question('Choose the sign: '+left+'  □  '+right,sign,a+' '+sign+' '+b+'.',{choices:['<','=','>']});
 };
 switch(type){
  case 'graph':case 'compareGraph':{
   const names=['Apple','Pear','Mango','Peach'];
   const counts=shuffled([1,3,5,7].map(x=>x+integer(0,1)));
   const index=integer(0,3), next=(index+1)%4;
   const visual='<div class="columns" role="img" aria-label="'+names.map((name,i)=>name+': '+counts[i]).join(', ')+'">'+names.map((name,i)=>'<div class="column">'+'<span class="dot"></span>'.repeat(counts[i])+'<span>'+name+'</span></div>').join('')+'</div>';
   if(type==='graph' && m%2===0){
    const biggest=names[counts.indexOf(Math.max(...counts))];
    return question('Which fruit got the most votes?',biggest,biggest+' has the tallest column.',{choices:names,visual});
   }
   if(type==='graph') return question('How many votes did '+names[index]+' get?',counts[index],names[index]+' has '+counts[index]+' blocks.',{visual});
   const high=Math.max(counts[index],counts[next]), low=Math.min(counts[index],counts[next]);
   return question('What is the difference between the votes for '+names[index]+' and '+names[next]+'?',high-low,high+' − '+low+' = '+(high-low)+'.',{visual});
  }
  case 'add': return math(10*h+integer(1,4),10*integer(1,3)+integer(1,4));
  case 'carry': return math(10*h+8,10*k+integer(3,9));
  case 'addOne': return math(10*h+8,integer(3,9));
  case 'addStory':return math(10*h+n,10*k+m,false,true);
  case 'subtract':return math(10*h+9,10*integer(1,h)+m,true);
  case 'borrow':return math(10*(h+1)+1,10*h+integer(2,9),true);
  case 'borrowZero':return math(10*(h+1),10*h+m,true);
  case 'subtractStory':return math(10*(h+1)+n,10*h+m,true,true);
  case 'inverse':return question('Fill in the missing number: '+(10*h+n)+' + □ = '+(10*h+n+m),m,(10*h+n+m)+' − '+(10*h+n)+' = '+m+'.');
  case 'clock':{
   const minute=integer(0,11)*5, hour=integer(1,12);
   const time=(hr,min)=>hr+':'+String(min).padStart(2,'0');
   const visual='<div class="clock" role="img" aria-label="Analog clock">'+Array.from({length:12},(_,i)=>'<span style="left:'+(50+39*Math.sin(i*Math.PI/6))+'%;top:'+(50-39*Math.cos(i*Math.PI/6))+'%">'+(i||12)+'</span>').join('')+'<i style="height:27%;transform:translateX(-50%) rotate('+(hour*30+minute/2)+'deg)"></i><i class="minute" style="height:36%;transform:translateX(-50%) rotate('+minute*6+'deg)"></i></div>';
   return question('What time does the clock show?',time(hour,minute),'The clock shows '+time(hour,minute)+'.',{visual,choices:[time(hour,minute),time(hour%12+1,minute),time(hour,(minute+10)%60),time(hour,(minute+30)%60)]});
  }
  case 'duration':return unit('A game starts at 3:'+String(h*5).padStart(2,'0')+' and ends at 4:00. How long is it?',60-h*5,'min',5);
  case 'cm':return question('Which unit is best for the length of a pencil?','cm','Centimeters work well for the length of a pencil.',{choices:['cm','mL','dL','min']});
  case 'mm':return unit(n+' cm = □ mm',n*10,'mm',10);
  case 'mixedLength':return unit(n+' cm '+m+' mm = □ mm',n*10+m,'mm');
  case 'line':return unit('A line starts at the '+h+' cm mark and ends at the '+(h+n)+' cm mark. How long is it?',n,'cm');
  case 'lengthSum':return unit('A '+(10+h)+' cm ribbon is joined to a '+(10+n)+' cm ribbon. What is their total length?',20+h+n,'cm');
  case 'hundreds':return question('What number is '+h+' hundreds?',h*100,h+' × 100 = '+h*100+'.',{step:100});
  case 'hundredsTens':return question('What number has '+h+' hundreds and '+m+' tens?',100*h+10*m,100*h+' + '+10*m+' = '+(100*h+10*m)+'.',{step:10});
  case 'place':return question('How many ones are in the ones place of '+(100*h+10*k+m)+'?',m,'The rightmost digit is '+m+'.');
  case 'value':return question('What is the value of '+k+' in '+(100*h+10*k+m)+'? Look at the tens place.',10*k,k+' tens = '+10*k+'.',{step:10});
  case 'expanded':return question('What number equals '+100*h+' + '+10*k+' + '+m+'?',100*h+10*k+m,'Add the hundreds, tens and ones.',{step:10});
  case 'sequence':return question('What comes next? '+(100*h+10*k)+', '+(100*h+10*k+10)+', '+(100*h+10*k+20)+', …',100*h+10*k+30,'Add 10 to the last number.',{step:10});
  case 'tensGroups':return question('How many tens make '+(100*h+10*k)+'?',10*h+k,'Each group contains 10.');
  case 'placeCalc':return question('Calculate '+(100*h+10*k)+' − '+10*k+'.',100*h,'Subtract the tens. The hundreds stay the same.',{step:10});
  case 'compare':return compare(100*h+10*k+m,100*h+10*n+integer(1,9));
  case 'compareExpression':return compare(100*h,100*k,100*h+10*n+' − '+10*n);
  case 'dl':return unit('A cup holds '+m+' dL. A jug holds '+(m+n)+' dL. How many more dL does the jug hold?',n,'dL');
  case 'liters':return unit(h+' L '+m+' dL = □ dL',10*h+m,'dL',10);
  case 'ml':return unit(n+' dL = □ mL',100*n,'mL',100);
  case 'addBig':return math(100*integer(1,4)+23+n%3,100*integer(1,4)+31+m%3);
  case 'carryBig':return math(100*integer(1,4)+68,100*integer(1,4)+integer(46,89));
  case 'addBigStory':return math(100*integer(1,4)+27+n,100*integer(1,4)+38+m,false,true);
  case 'subtractBig':return math(100*integer(5,9)+70+m,100*integer(1,4)+31,true);
  case 'borrowBig':return math(100*integer(5,9)+10+k,100*integer(1,4)+80+k+1,true);
  case 'subtractBigStory':return math(100*integer(5,9)+20+n,100*integer(1,4)+40+m,true,true);
  case 'group':return question('Calculate '+h+' + ('+(20+m)+' + '+(10-m)+').',h+30,'Add the numbers in parentheses first to get 30.');
  case 'mental':{
   const a=10*h+9;
   return question('Use mental math: '+a+' + '+n+' = □',a+n,'Add '+n+' to '+(a+1)+', then subtract 1.');
  }
 }
 throw new Error('Unknown lesson: '+type);
}

const assessmentSamples = [
 [],
 [['Find the sum: 79 + 6.',85,'79 + 6 = 85.',vertical(79,6,'+')]],
 [['Find the difference: 34 − 17.',17,'34 − 17 = 17.',vertical(34,17,'−')]],
 [],
 [['5 cm 4 mm = □ mm',54,'5 cm is 50 mm. Add 4 mm to get 54 mm.']],
 [['What number has 5 hundreds, 2 tens and 4 ones?',524,'500 + 20 + 4 = 524.']],
 [['2 L = □ dL',20,'Each liter contains 10 dL, so 2 L = 20 dL.']],
 [['Calculate 169 − 98.',71,'169 − 98 = 71.',vertical(169,98,'−')]],
 [['Calculate 19 + 7.',26,'Think 20 + 7 − 1 = 26.']]
];
