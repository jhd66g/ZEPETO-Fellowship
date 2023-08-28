import {ZepetoScriptBehaviour} from 'ZEPETO.Script'
import {AnimationCurve, AudioRolloffMode, AudioSource, GameObject, Keyframe} from "UnityEngine";

export default class AudioManager extends ZepetoScriptBehaviour {
    public static GetInstance(): AudioManager
    {
        if (AudioManager.instance == undefined)
        {
            AudioManager.instance = new GameObject("AudioManager").AddComponent<AudioManager>();
        }
        return AudioManager.instance;
    }

    private static instance : AudioManager;
    
    private globalSource : AudioSource;
    
    Awake() {   
        
    }

}
