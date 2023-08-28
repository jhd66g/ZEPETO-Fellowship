import {AudioClip, Collider, GameObject } from 'UnityEngine';
import {UnityAction$1, UnityEvent$1 } from 'UnityEngine.Events';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import ItemCollectionManager from './ItemCollectionManager';

export default class ItemCollection extends ZepetoScriptBehaviour {
    public itemValue : number = 1;
    private itemID: number = -1;
    
    public Awake()
    {
        ItemCollectionManager.GetInstance().AddCoin(this);
    }
    
    public SetItemID(id: number)
    {
        this.itemID = id;
    }
    
    public OnTriggerEnter(other: Collider)
    {
        if (other.tag == "Player")
        {
            this.CollectCoin();
        }
    }
    
    private CollectCoin()
    {
        ItemCollectionManager.GetInstance().CollectCoin(this.itemID);
        ItemCollectionManager.GetInstance().RemoveCoin(this.itemID);
        GameObject.Destroy(this.gameObject);
    }
}