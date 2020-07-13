import Process from './Process.js'
import App from "./App.js";

const rootProcess = new Process();
const targetProcess = new Process();

rootProcess.is('Michael Smith')
targetProcess.is('Shirley Cornelius');

const app = new App(rootProcess, targetProcess);

app.afterLoad(function(){
    document.querySelector('#layer').innerText = app.layer;
});

app.afterFinish(function(){
    console.log('End : ' + app.layer);
    app.stackTrace.forEach(function(value){
        const div = document.createElement('div');
        div.innerText = value;
        div.classList.add('my-4');
        div.classList.add('text-center');
        div.classList.add('text-2xl');
        div.classList.add('bg-gray-100');
        div.classList.add('hover:bg-gray-200');
        div.classList.add('py-3');
        document.querySelector('#content').appendChild(div);
    });
});

app.load(100);