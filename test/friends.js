// const app = require("../routes/friendRemoval.js");
// const chai = require("chai"); 
// const chaiHttp = require("chai-http"); 

// const { expect } = chai; 

// chai.use(chaiHttp); 

// describe ("friendRemoval works!", () => {

//     const friendID = "5d7f21e697d291000476d199";
//     const id = "5d6a87abe6e391e9e4357e8e";

//     it("friend is removed", done => { 
//         chai.request(app).put("/friendRemoval/" + friendID +"/" + id)
//         .end((err, res) => { 

//             expect(res).to.have.status(204);
//             done(); 

//         });
//     });
// });