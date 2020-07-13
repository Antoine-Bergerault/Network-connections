export default class App{

    constructor(rootProcess, targetProcess){
        this.rootProcess = rootProcess;
        this.targetProcess = targetProcess;
        
        this.layer = 0;
        this.stackTrace = [];
    }

    afterLoad(cb){
        this.afterLoad = cb;
    }

    afterFinish(cb){
        this.afterFinish = cb;
    }

    load(interval = 500){
        this.interval = setInterval(() => {
            if(this.layer >= 10){
                clearInterval(this.interval);
                console.log('too long');
                return false;
            }
            if(this.layer % 2 === 0){
                this.rootProcess.next();
            }else{
                this.targetProcess.next();
            }
            this.layer++;
            if(this.afterLoad){
                this.afterLoad();
            }
            if(this.targetProcess.match(this.rootProcess) || this.rootProcess.match(this.targetProcess)){
                this.stackTrace = [...this.rootProcess.stackTrace, ...this.targetProcess.stackTrace.reverse()];
                this.stackTrace = [...new Set(this.stackTrace)];
                this.stackTrace = this.stackTrace.filter((value) => {
                    return value !== null && value.length > 0;
                });
                clearInterval(this.interval);
                this.finish();
            }
        }, interval);
    }

    finish(){
        console.log('finish');
        if(this.afterFinish){
            this.afterFinish();
        }
    }

}