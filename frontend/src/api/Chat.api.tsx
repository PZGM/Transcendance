import { useReducer } from "react";

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}


export class ChatAPI {


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

    public static async addChannel(name: string, owner: any, visibility: string, users: any, messages: any) {
        let ret = true;
        await fetch(`https://serv.pizzagami.fr:4333/api/channels`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name: name, owner: owner, visibility: visibility, users: users, messages: messages}),
        credentials: "include"})
        .then(handleErrors)
        .catch(err => {
            console.log(err);
            ret = false;
        })
        return ret;
    }

}