/**
 * Created by weijianli on 15/11/12.
 */
function dragReload(){
    var _touch = {
        start: 'touchstart',
        move: 'touchmove',
        end: 'touchend'
    };
    var state = {
        downLength:0,
        lastPy:0,
        reloadFlag :false
    };


    function cssCoreFun(testCss) {
        switch (true) {
            case testCss.webkitTransition === '':
                return 'webkit'; break;
            case testCss.MozTransition === '':
                return 'Moz'; break;
            case testCss.msTransition === '':
                return 'ms'; break;
            case testCss.OTransition === '':
                return 'O'; break;
            default:
                return '';
        }
    }
    var cssCore = cssCoreFun(document.createElement('weivea').style);

    var reloadTip = document.querySelector(".reloadTip");//

    var pageContain = document.body;
    pageContain.addEventListener(_touch.start, function(e){
        state.lastPy = e.touches[0].pageY;
        reloadTip.style[cssCore+'TransitionDuration'] = '0ms';
    });
    pageContain.addEventListener(_touch.move, function(e){
        if(document.body.scrollTop == 0){
            state.downLength += e.touches[0].pageY-state.lastPy;
            reloadTip.style[cssCore+'Transform'] = "translateY("+state.downLength+"px) rotate("+state.downLength*2+"deg)";
            if(e.touches[0].pageY>state.lastPy){//向下滑
                e.preventDefault();
                if(state.downLength>85){
                    state.reloadFlag = true;
                }
            }else{//向上滑
                if(state.downLength<35){
                    state.reloadFlag = false;
                }
            }
        }


        state.lastPy = e.touches[0].pageY;
    });
    pageContain.addEventListener(_touch.end, function(e){
        reloadTip.style[cssCore+'TransitionDuration'] = '300ms';
        state.downLength = 0;
        reloadTip.style[cssCore+'Transform'] = "translateY(0) rotate(0deg)";
        if(state.reloadFlag){
            setTimeout(function(){
                location.reload();
            },300)
        }

    });

};