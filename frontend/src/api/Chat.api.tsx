function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export class RelationsPicker {
    withOwner?: boolean;
    withChat?: boolean;
    withMuted?: boolean;
    withAdmin?: boolean;
    withBanned?: boolean;
}

function optionsToQuery(options: RelationsPicker) {
    let tab: string[] = [];
    if (options.withAdmin)
        tab.push('withAdmin=true');
    if (options.withOwner)
        tab.push('withOwner=true');
    if (options.withChat)
        tab.push('withChat=true');
    if (options.withMuted)
        tab.push('withMuted=true');
    if (options.withBanned)
        tab.push('withBanned=true');
    return tab.join('&');
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
         return resp
    }

    // ${process.env.REACT_APP_GET_CHANNELS_NAMES}
    public static async getChannelsNames(): Promise<string[]|null> {
        const resp = await fetch(`${process.env.REACT_APP_GET_CHANNELS_NAMES}`, {
            method: "GET",
            credentials: "include"})
            .then(response => {return response.json()})
            .then(json => {return json})
            .catch(err => {
                console.log('No channels')
                return null;
            })
         return resp
    }

    public static async getAllChannelsNames(): Promise<string[]|null> {
        const resp = await fetch(`${process.env.REACT_APP_GET_CHANNELS_NAMES}`, {
            method: "GET",
            credentials: "include"})
            .then(response => {return response.json()})
            .then(json => {return json})
            .catch(err => {
                console.log('No channels')
                return null;
            })
         return resp
    }


    // ${process.env.REACT_APP_GET_CHANNELS_ID}
    public static async getChannelById(id: number, options?: RelationsPicker) {
        const query = (options) ? `?${optionsToQuery(options)}` : '';
        const resp = await fetch(`${process.env.REACT_APP_GET_CHANNELS_ID}${id}${query}`, {
            method: "GET",
            credentials: "include"})
            .then(response => {return response.json()}).then(json => {return json})
            .catch(err => {
                console.log("Id name not found")
                return null;
            })
        return resp
    }
    public static async getChannelByName(name: string, options?: RelationsPicker) {
        const query = (options) ? `?${optionsToQuery(options)}` : '';
        const resp = await fetch(`${process.env.REACT_APP_GET_CHANNELS_BY_NAME}${name}${query}`, {
            method: "GET",
            credentials: "include"})
            .then(response => {return response.json()}).then(json => {return json})
            .catch(err => {
                return null;
            })
        return resp
    }

    // ${process.env.REACT_APP_GET_CHANNELS}
    public static async addChannel(name: string, ownerId: number, visibility: string, password?: any): Promise<boolean> {
        const body = (password && visibility === 'protected') ? JSON.stringify({name, ownerId, visibility, password}) : JSON.stringify({name, ownerId, visibility});
        const ret = await fetch(`${process.env.REACT_APP_GET_CHANNELS}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body,
        credentials: "include"})
        .then(response => {return response.json()}).then(json => {return json})
        .catch(err => {
            return false;
        })
        return ret;
    }
    
    public static async addMessage(message: string, authorId: number, channelId: number) {
        let ret = true;
        await fetch(`${process.env.REACT_APP_MESSAGES}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({content: message, authorId: authorId, channelId}),
        credentials: "include"})
        .then(handleErrors)
        .catch(err => {
            console.log(err);
            ret = false;
        })
        return ret;
    }

    public static async deleteMessage(messageId: number) {
        let ret = true;
        await fetch(`${process.env.REACT_APP_MESSAGES}/${messageId}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        credentials: "include"})
        .then(handleErrors)
        .catch(err => {
            console.log(err);
            ret = false;
        })
        return ret;
    }

    public static async getByChannelId(channelId: number) {
        const resp = await fetch(`${process.env.REACT_APP_MESSAGES_BY_CHANNEL}/${channelId}`, {
            method: "GET",
            credentials: "include"})
            .then(response => {return response.json()})
            .then(json => {return json})
            .catch(err => {
                console.log('No channels')
                return null;
            })
         return resp
    }

    public static async joinChannel(channelId: number, password?: string): Promise<boolean> {
        const resp = await fetch(`${process.env.REACT_APP_JOIN_CHANNEL}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: password ? JSON.stringify({channelId, password}) : JSON.stringify({channelId}),
            credentials: "include"})
            .then(response => {return response.json()})
            .then(json => {return json});
            return resp;
    }

    public static async leaveChannel(channelId: number) {
        const resp = await fetch(`${process.env.REACT_APP_LEAVE_CHANNEL}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({channelId}),
            credentials: "include"})
            .then(response => {return response.json()})
            .then(json => {return json})
            .catch(err => {
                console.log('No channels')
                return null;
            })
         return resp
    }

    public static async promoteAdmin(channelId: number, adminId: number): Promise<boolean> {
        const resp = await fetch(`${process.env.REACT_APP_PROMOTE_ADMIN}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({channelId, adminId}),
            credentials: "include"})
            .then(response => {return response.json()})
            .then(json => {return json});
            return resp;
    }

    public static async demoteAdmin(channelId: number, adminId: number): Promise<string> {
        const resp = await fetch(`${process.env.REACT_APP_DEMOTE_ADMIN}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({channelId, adminId}),
            credentials: "include"})
            .then(response => {return response.json()})
            .then(json => {return json});
            return resp;
    }

    public static async inviteUser(channelId: number, invitedId: number) : Promise<boolean>{
        const resp = await fetch(`${process.env.REACT_APP_INVITE_IN_CHANNEL}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({channelId, invitedId}),
            credentials: "include"})
            .then(response => {return response.json()})
            .then(json => {return json});
            return resp;
    }

    public static async createOrJoinPrivateMessage(friendId: number) : Promise<number>{
        const resp = await fetch(`${process.env.REACT_APP_MP_CHANNEL}${friendId}`, {
            method: "PUT",
            credentials: "include"})
            .then(response => {return response.json()})
            .then(json => {return json});
            return resp;
    }

    //mute
    public static async mute(userId: number, channelId: number, hours: number) : Promise<boolean>{
        const date: number = Date.now() + 3600 * 1000 * hours;
        const resp = await fetch(`${process.env.REACT_APP_MUTE}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({userId, channelId, date}),
            credentials: "include"})
            .then(response => {return response.json()})
            .then(json => {return json});
            return resp;
    }

    public static async unmute(userId: number, channelId: number) : Promise<boolean>{
        const resp = await fetch(`${process.env.REACT_APP_MUTE}`, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({userId, channelId}),
            credentials: "include"})
            .then(response => {return response.json()})
            .then(json => {return json});
            return resp;
    }

    public static async muteRemaining(userId: number, channelId: number) : Promise<number>{
        const resp = await fetch(`${process.env.REACT_APP_MUTE_REMAINING}/${channelId}/${userId}`, {
            method: "GET",
            credentials: "include"})
            .then(response => {return response.json()})
            .then(json => {return json});
            return resp;
    }


    //ban

    public static async ban(userId: number, channelId: number, days: number) : Promise<boolean>{
        const date: number = Date.now() + 3600 * 1000 * 24 * days;
        const resp = await fetch(`${process.env.REACT_APP_BAN}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({userId, channelId, date}),
            credentials: "include"})
            .then(response => {return response.json()})
            .then(json => {return json});
            return resp;
    }

    public static async banRemaining(userId: number, channelId: number) : Promise<number>{
        const resp = await fetch(`${process.env.REACT_APP_BAN_REMAINING}/${channelId}/${userId}`, {
            method: "GET",
            credentials: "include"})
            .then(response => {return response.json()})
            .then(json => {return json});
            return resp;
    }

    public static async unban(userId: number, channelId: number) : Promise<boolean>{
        const resp = await fetch(`${process.env.REACT_APP_BAN}`, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({userId, channelId}),
            credentials: "include"})
            .then(response => {return response.json()})
            .then(json => {return json});
            return resp;
    }


}