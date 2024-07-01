var beginCourseName = '2024年公需科目学习问答';
//筛选出所有课程
var array = $('.f14blue');
var array2 = [];
for(var i =0;i<array.length;i++){
    if(array[i].innerHTML.startsWith('<strong')){
        array2.push(array[i]);
    }
}

//页面下方开个小窗
$('body').append('<iframe id="myIframe" name="myIframe" style="width:1080px;height:900px">12321321321312<iframe>');


//从某节课开始
var beginIndex = 0;
for(;beginIndex<array2.length;beginIndex++){
    if(array2[beginIndex].innerText.startsWith(beginCourseName)){
        break;
    }
}
var interval1 =0;
var interval2 =0;


function set2interval(){
	//检测跳过答题
	interval1 = setInterval(function(){
		var skip = $(window.frames["myIframe"].document).find(".pv-ask-skip")[0];
		if(skip){
			console.log('【'+array2[beginIndex].innerText + '】跳过了一个弹窗答题');
			skip.click();
		}
	},5 * 1000);

	//检测是否播完
	interval2 = setInterval(function(){
		var jrks = $(window.frames["myIframe"].document).find("#jrks");
		if(jrks && jrks.attr('disabled') != 'disabled'){
			console.log('【'+array2[beginIndex].innerText + '】看完了');
			beginIndex ++ ;
			playVedio();
			
		}
	},10 * 1000);
}

function playVedio(){
	clearInterval(interval1);
	clearInterval(interval2);
	set2interval();
	array2[beginIndex].target='myIframe';
	array2[beginIndex].click();
	console.log('正在观看【'+array2[beginIndex].innerText+'】，进度'+beginIndex+'/'+(array2.length-1));
}

playVedio();
