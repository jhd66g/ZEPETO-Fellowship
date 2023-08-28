import { Transform } from 'UnityEngine';
import { Button } from 'UnityEngine.UI';
import { ZepetoPlayers, SpawnInfo, LocalPlayer, ZepetoPlayer } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { WorldService } from 'ZEPETO.World';
import Main from './Main';

export default class StartMenuWindow extends ZepetoScriptBehaviour {
    static LoadCharacter() {
        throw new Error('Method not implemented.');
    }
    public StartButton : Button;
    public spawnPoint: Transform;
    private player: ZepetoPlayer;

    Start() {    
        this.StartButton.onClick.AddListener(() => {Main.GetUIManager().HideAllWindows();});
        this.StartButton.onClick.AddListener(() => {this.LoadCharacter()});
    }

    public ShowWindow() {
        this.gameObject.SetActive(true);
    }

    public HideWindow() {
        this.gameObject.SetActive(false);
    }

    public LoadCharacter() {
        let info = new SpawnInfo();
        info.position = this.spawnPoint.position;
        info.rotation = this.spawnPoint.rotation;
        
        ZepetoPlayers.instance.CreatePlayerWithUserId(WorldService.userId, info, true);  
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            let player : LocalPlayer = ZepetoPlayers.instance.LocalPlayer;
            player.zepetoPlayer.character.gameObject.tag = "Player";
            player.zepetoPlayer.character.gameObject.name = WorldService.userId;
        });
    }
}