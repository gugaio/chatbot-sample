import {Squad} from "ajent";
import {FakeUserAgent} from "../ajents/FakeUserAgent";

class AgentService {

  constructor(apiToken) {
    const agents = [new FakeUserAgent()];    
    const squadParams = {
      agents: agents,
      apiToken: apiToken
    };
    this.squad = new Squad(squadParams);
  }

  async send(message) {
    return await this.squad.send(message);
  }
}

export default AgentService; 