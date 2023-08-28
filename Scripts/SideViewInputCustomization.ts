import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import {ZepetoCharacter, ZepetoPlayers, ZepetoScreenTouchpad} from "ZEPETO.Character.Controller";
import {ZepetoInputControl} from "RootNamespace";
import {Input, KeyCode, Time, Vector2, Vector3 } from 'UnityEngine';
import { Button } from 'UnityEngine.UI';

export default class HorzontalMovementControls extends ZepetoScriptBehaviour {
    private zepetoScreenPad: ZepetoScreenTouchpad;
    private myCharacter: ZepetoCharacter;
    private myInputControl: ZepetoInputControl;

    Start() {
        this.myInputControl = new ZepetoInputControl();

        this.myInputControl.Enable();
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            this.myCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character;
            this.zepetoScreenPad = ZepetoPlayers.instance.transform.Find("UIZepetoPlayerControl").Find("SafeArea").Find("Pad").GetComponent<ZepetoScreenTouchpad>();

            this.zepetoScreenPad.OnDragEvent.AddListener(deltaVector => {
                console.log(`[OnDragEvent] : ${deltaVector.ToString()}`);
                this.myCharacter.MoveContinuously(new Vector3(deltaVector.x, 0,0));
            });

            this.zepetoScreenPad.OnPointerUpEvent.AddListener(() => {
                this.myCharacter.StopMoving();
            });
        });
    }

    Update()
    {
        if (Input.GetKey(KeyCode.D))
        {
            this.myCharacter.Move(new Vector3(1, 0,0));
        }

        if (Input.GetKey(KeyCode.A))
        {
            this.myCharacter.Move(new Vector3(-1, 0,0));
        }

        if (Input.GetKey(KeyCode.Space))
        {
            this.myCharacter.Jump();
        }

        if (Input.GetKey(KeyCode.LeftShift))
        {
            this.myCharacter.DoubleJump();
        }
    }
}