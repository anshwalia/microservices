'use strict';

// Chat Model Class
export class Chat{

    constructor(){
        try{
            console.log("[ Chat Model Instance Created ]");
        }
        catch(error){ throw error; }
    }

    async init(){
        try{
            console.log("Chat Mode Init Success");
        }
        catch(error){ throw error; }
    }

    // Method To Create New Chat
    async createNewChat(chat_title:string,chat_users:string[]){
        try{
            return {
                time_stamp: {
                    created: Date.now(),
                    updated: Date.now()
                },
                title: chat_title,
                users: chat_users,
                content: {}
            }
        }
        catch(error){ throw error; }
    }

}

// Function To Make Chat Model Instance
export async function makeChatModel() {
    try{
        const ChatModel = new Chat();
        await ChatModel.init();
        return ChatModel;
    }
    catch(error){ throw error; }
}