import {Quaternion, Time, Transform, Vector3 } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class Oscillation extends ZepetoScriptBehaviour {
    public point1: Vector3 = new Vector3(0,1,0);
    public point2: Vector3 = new Vector3(0,-1,0);
    public moveSpeed : number = 5;
    public lookDir: boolean;
    
    private curPoint : number = 0;
    private progress: number = 0;
    private startPos : Vector3;
    
    public Start()
    {
        this.startPos = this.transform.position;
    }
    
    Update()
    {
        this.transform.position = Vector3.Lerp(this.startPos + this.point1, this.startPos + this.point2, (Math.sin(this.progress) + 1.0) / 2.0);
        
        if (this.lookDir)
        {
            if ((this.progress % (Math.PI * 2.0)) > Math.PI/2 && (this.progress % (Math.PI * 2.0)) < (3 * Math.PI/2))
                this.transform.rotation = Quaternion.LookRotation(this.point1 - this.point2);
            else
                this.transform.rotation = Quaternion.LookRotation(this.point2 - this.point1);
        }
        
        this.progress += Time.deltaTime * this.moveSpeed;
    }

}