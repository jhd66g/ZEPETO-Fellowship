import { Transform } from 'UnityEngine';
import {SpawnInfo, ZepetoPlayer, ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { WorldService } from 'ZEPETO.World';

export default class CharacterSpawn extends ZepetoScriptBehaviour {
    public spawnPoint: Transform;
    
    private player: ZepetoPlayer;
    Start() {    
        let info = new SpawnInfo();
        info.position = this.spawnPoint.position;
        info.rotation = this.spawnPoint.rotation;
        ZepetoPlayers.instance.CreatePlayerWithUserId(WorldService.userId, info , true);

        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            this.player = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer;
            this.player.character.tag = "Player";
            this.player.character.gameObject.name = this.player.userId;
        });
    }

}