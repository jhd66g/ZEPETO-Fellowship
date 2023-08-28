import { Application } from 'UnityEngine';
import { Button } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';

export default class EndMenuWindow extends ZepetoScriptBehaviour {
    public ShowWindow() {
        this.gameObject.SetActive(true);
    }

    public HideWindow() {
        this.gameObject.SetActive(false);
    }
}
