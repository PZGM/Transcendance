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
            console.log(resp)
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
    public static async getChannelByName(name: string, options?: RelationsPicker) {
        console.log('get channel by name');
        console.log(options);
        const query = (options) ? `?${optionsToQuery(options)}` : '';
        const resp = await fetch(`${process.env.REACT_APP_GET_CHANNELS_BY_NAME}${name}${query}`, {
            method: "GET",
            credentials: "include"})
            .then(response => {return response.json()}).then(json => {return json})
            .catch(err => {
                console.log('error:')
                console.log(err)
                return null;
            })
        console.log(resp);
        console.log('.....');
        return resp
    }

    // ${process.env.REACT_APP_GET_CHANNELS}
    public static async addChannel(name: string, ownerId: number, visibility: string, password?: any) {
        const body = (password && visibility === 'protected') ? JSON.stringify({name, ownerId, visibility, password}) : JSON.stringify({name, ownerId, visibility});
        let ret = true;
        await fetch(`${process.env.REACT_APP_GET_CHANNELS}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body,
        credentials: "include"})
        .then(handleErrors)
        .catch(err => {
            console.log(err);
            ret = false;
        })
        return ret;
    }
    
    public static async addMessage(message: string, authorId: number,channelId: number) {
        let ret = true;
        console.log('post message from front')
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

    public static async getByChannelId(channelId: number) {
        console.log(`get messages from channel: ${channelId}`);
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
            console.log(resp)
         return resp
    }

}