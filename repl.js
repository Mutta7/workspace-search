const mongoose = require("mongoose"),
    Subscriber = require("./models/subscriber"),
    Workspace = require("./models/workspace");
const subscriber = require("./models/subscriber");
const workspace = require("./models/workspace");

var testWorkspace, testSubscriber;

mongoose.connect(
    "mongodb://localhost:27017/workspace_db",
    {useNewUrlParser: true}
);

mongoose.Promise = global.Promise;

Subscriber.remove({})
    .then((items) => console.log(`Removes ${items.n} records!`))
    .then(() => {
        return Workspace.remove({});
    })
    .then((items) => console.log(`Removes ${items.n} records!`))
    .then(() => {
        return Subscriber.create( {
            name: "Chris Green",
            email: "chris-green@sample.com",
            zipCode: "1230099"
        });
    })
    .then(subscriber => {
        console.log(`Created Subscriber: ${subscriber.getInfo()}`);
    })
    .then(() => {
        return Subscriber.findOne( {
            name: "Chris Green"
        })
    })
    .then(subscriber => {
        testSubscriber = subscriber;
        console.log(`Found one subscriber: ${subscriber.getInfo()}`);
    })
    .then(() => {
        return Workspace.create({
            name: "WeWork 東京スクエアガーデン",
            address: "104-0031 東京都中央区京橋3-1-1 東京スクエアガーデン 14F",
            zipCode: 1040031,
            equipments: ["高速Wi-Fi", "フリードリンク", "プリンター・シュレッダー", "オフィス家具"]
        });
    })
    .then( workspace => {
        testWorkspace = workspace;
        console.log(`Created workspace: ${workspace.name}`);
    })
    .then(() => {
        testSubscriber.workspaces.push(testWorkspace);
        testSubscriber.save();
    })
    .then(() => {
        return Subscriber.populate(testSubscriber, "workpace")
    })
    .then(subscriber => console.log(subscriber))
    .then(() => {
        return Subscriber.find(
            {workspaces: mongoose.Types.ObjectId(testWorkspace._id)}
        );
    })
    .then(subscriber => console.log(subscriber));