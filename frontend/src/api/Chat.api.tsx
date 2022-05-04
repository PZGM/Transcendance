import { useReducer } from "react";
import { StringLiteralLike } from "typescript";

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export class ChatAPI {

    // ${process.env.REACT_APP_GET_CHANNELS}
    public static async getChannels() {
        const resp = await fetch(`${process.env.REACT_APP_GET_CHANNELS}`, {
            method: "GET",
            credentials: "include"})
            .then(response => {return response.json()})
            .then(json => {return json})
            .catch(err => {
                console.log('No channels')
                return null;
            })
            console.log(resp)
         return resp
    }
    // ${process.env.REACT_APP_GET_CHANNELS_ID}
    public static async getChannelById(id: number) {
        const resp = await fetch(`${process.env.REACT_APP_GET_CHANNELS_ID}${id}`, {
            method: "GET",
            credentials: "include"})
            .then(response => {return response.json()}).then(json => {return json})
            .catch(err => {
                console.log("Id name not found")
                return null;
            })
        return resp
    }
    public static async getChannelByName(name: string) {
        const resp = await fetch(`${process.env.REACT_APP_GET_CHANNELS_BY_NAME}${name}`, {
            method: "GET",
            credentials: "include"})
            .then(response => {return response.json()}).then(json => {return json})
            .catch(err => {
                console.log("Channel name not found")
                return null;
            })
        return resp
    }
    // ${process.env.REACT_APP_GET_CHANNELS}
    public static async addChannel(name: string, owner: any, visibility: string, users: any, messages: any, password: any, mute: any, admin: any, id: number) {
        let ret = true;
        await fetch(`${process.env.REACT_APP_GET_CHANNELS}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name: name, owner: owner, visibility: visibility, users: users, messages: messages, password: password, mute: mute, admin: admin}),
        credentials: "include"})
        .then(handleErrors)
        .catch(err => {
            console.log(err);
            ret = false;
        })
        return ret;
    }
    
    public static async addMsg(createdat: Date,content: string,author: any,channel: any) {
        let ret = true;
        await fetch(`https://serv.pizzagami.fr:4333/api/messages`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({createdat: createdat,content: content, author: author, channel: channel}),
        credentials: "include"})
        .then(handleErrors)
        .catch(err => {
            console.log(err);
            ret = false;
        })
        return ret;
    }

}