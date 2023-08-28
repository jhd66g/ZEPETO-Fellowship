import {Rect, Sprite, Texture, Texture2D, Vector2, WaitForSeconds } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import {WorldService, ZepetoWorldHelper } from 'ZEPETO.World';
import { Image } from 'UnityEngine.UI';

export default class ProfileImageLoader extends ZepetoScriptBehaviour {
    
    private img : Image;
    
    private tries: number = 0;
    private maxTries: number = 10;
    Start() {
        this.img = this.GetComponent<Image>();
        this.StartCoroutine(this.LoadProfilePic());
    }

    GetSprite(texture: Texture) {
        let rect: Rect = new Rect(0, 0, texture.width, texture.height);
        return Sprite.Create(texture as Texture2D, rect, new Vector2(0.5, 0.5));
    }
    
    private *LoadProfilePic()
    {
        ZepetoWorldHelper.GetProfileTexture(WorldService.userId, (texture: Texture) => {
            this.img.sprite = this.GetSprite(texture);
        }, (error) => {
            console.log(error);
        });
    }
}