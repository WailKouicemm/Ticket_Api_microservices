 import nats , {Stan} from "node-nats-streaming";


 class NatsWrapper{
    private _client? : Stan

    
     get client() : Stan {
        if (!this._client) {
            throw new Error("Cannot Access To Nats Client Before Connecting ");
        }
        return this._client
    }
    


    connect(clusterId:string,clientId:string,url:string): Promise<void>{
        this._client = nats.connect(clusterId,clientId,{url:url})



        return new Promise((resolve,reject)=>{

            this._client?.on("connect",()=>{
                console.log("PUBLISHER CONNECTED TO NATS");
                resolve()
            })

            this._client?.on("error",(error)=>{
                reject(error)
            })

        })

        
    }
 }



 export const natsWrapper = new NatsWrapper()