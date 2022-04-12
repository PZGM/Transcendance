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
    public static async getChannel() {
        const resp = await fetch(`https://serv.pizzagami.fr:4333/api/channels`, {
            method: "GET",
            credentials: "include"})
            .then(response => {return response.json()})
            .then(json => {return json})
            .catch(err => {
                console.log('error catched')
                return null;
            })
            console.log(resp)
         return resp
    }
    // ${process.env.REACT_APP_GET_CHANNELS_ID}
    public static async getChannelById(id: number) {
        const resp = await fetch(`https://serv.pizzagami.fr:4333/api/channels/${id}`, {
            method: "GET",
            credentials: "include"})
            .then(response => {return response.json()}).then(json => {return json})
            .catch(err => {
                console.log('error catched')
                return null;
            })
        return resp
    }
    // ${process.env.REACT_APP_GET_CHANNELS}
    public static async addChannel(name: string, owner: any, visibility: string, users: any, messages: any, password: any) {
        let ret = true;
        await fetch(`https://serv.pizzagami.fr:4333/api/channels`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name: name, owner: owner, visibility: visibility, users: users, messages: messages, password: password}),
        credentials: "include"})
        .then(handleErrors)
        .catch(err => {
            console.log(err);
            ret = false;
        })
        return ret;
    }

}