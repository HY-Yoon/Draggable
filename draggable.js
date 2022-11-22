const $sections = document.querySelectorAll('section');
const $leftSide = document.querySelector('.left-side');
const $rightSide = document.querySelector('.right-side');

let arr1 = [ '요소1','요소2','요소3','요소4','요소5','요소6','요소7','요소8' ];
let arr2 = [ '요소9','요소10' ];

$sections.forEach(section =>{
    // drop 기능 동작을 위함
    section.addEventListener('dragover', e =>{
        e.preventDefault(); 
    });

    section.addEventListener('drop', e =>{
        e.preventDefault();
        let data = e.dataTransfer.getData("data");

        // eval 없이 할때
        /*
        let currSecArr = [];
        let secId = section.id;
        switch(secId){
            case 'arr1' : 
                currSecArr = arr1;
                break;
            case 'arr2' :
                currSecArr = arr2;
                break;
        }
        */

        let currSecArr = eval(section.id);
        // 예외처리
        if(!Array.isArray(currSecArr)){
            return;
        }

        // 배열에 값 추가하고 div 그리기
        currSecArr.push(data);
        e.currentTarget.append(document.getElementById(data));
    });
})

const drawList = function( $box, arr ){
    let { length } = arr;
        
    for( let i = 0 ; i < length; i++ ){
        let item = document.createElement('div');
        item.textContent = arr[i];
        item.id = arr[i];
        item.className = 'item';
        item.setAttribute('draggable',true);
        
        item.addEventListener('dragstart', e=>{
            item.parentElement.classList.add('on');
            item.classList.add('dragging');
            e.dataTransfer.setData('data', item.id);

            // 기존 배열에서 값 삭제
            let prevSecArr  = eval(e.target.parentElement.id);
            let index = prevSecArr.indexOf(item.id);
            prevSecArr.splice(index,1);
        });

        item.addEventListener('dragend', e=>{
            $sections.forEach(section=>{
                section.classList.remove('on');
            });

            item.classList.remove('dragging');
            e.dataTransfer.clearData('data');
        });

        $box.append(item);
    }
};

drawList($leftSide, arr1);
drawList($rightSide, arr2);



