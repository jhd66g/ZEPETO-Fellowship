import { Debug, GameObject } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import UIManager, { WindowCallType } from './UIManager';

export default class Main extends ZepetoScriptBehaviour {

    private static _instance : Main;

    public UIManagerGO : GameObject;
    public _UIManager : UIManager;

    public static GetInstance() : Main {
        if (!Main._instance) { 
            Main._instance = GameObject.Find("Main").GetComponent<Main>();
        } 
        return Main._instance;
    }

    public static GetUIManager() : UIManager {
        return Main._instance._UIManager;
    }

    Awake() {
        if (Main._instance != null) {
            GameObject.Destroy(Main._instance.gameObject);
        }
        this._UIManager = this.UIManagerGO.GetComponent<UIManager>();
        Main._instance = this; 
        if (this._UIManager) {
            Debug.Log("UIManager is initialized");
        } else {
            Debug.Log("UIManager is not initialized");
        }
    }
}