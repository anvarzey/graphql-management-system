var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import Project from '../models/Project.js';
import Client from '../models/Client.js';
export const resolvers = {
    Query: {
        allProjects: () => __awaiter(void 0, void 0, void 0, function* () {
            const projects = yield Project.find({}).populate('client');
            return projects;
        }),
        getProject: (root, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { projectID } = args;
            const project = yield Project.findById(projectID).populate('client');
            return project;
        }),
        allClients: () => __awaiter(void 0, void 0, void 0, function* () {
            const clients = yield Client.find({}).populate('projects');
            return clients;
        }),
        getClient: (root, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { clientID } = args;
            const client = yield Client.findById(clientID).populate('projects');
            return client;
        })
    },
    Mutation: {
        addProject: (root, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { clientID } = args, projectProps = __rest(args, ["clientID"]);
            const client = yield Client.findById(clientID);
            if (!client)
                return null;
            const newProject = new Project(Object.assign(Object.assign({}, projectProps), { client: client._id }));
            try {
                yield newProject.save();
                client.projects.push(newProject._id);
                yield client.save();
                return newProject;
            }
            catch (error) {
                return null;
            }
        }),
        addClient: (root, args) => __awaiter(void 0, void 0, void 0, function* () {
            const newClient = new Client(Object.assign(Object.assign({}, args), { projects: [] }));
            yield newClient.save();
            return newClient;
        }),
        editProject: (root, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args, rest = __rest(args, ["id"]);
            const projectUpdated = yield Project.findByIdAndUpdate(id, rest, { returnDocument: 'after' }).populate('client');
            return projectUpdated;
        }),
        editClient: (root, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args, rest = __rest(args, ["id"]);
            const clientUpdated = yield Client.findByIdAndUpdate(id, rest, { returnDocument: 'after' }).populate('projects');
            return clientUpdated;
        }),
        deleteProject: (root, args) => __awaiter(void 0, void 0, void 0, function* () {
            const clientToUpdate = yield Client.findById(args.clientID);
            if (clientToUpdate) {
                const projectToRemove = yield Project.findByIdAndRemove(args.id);
                const newProjArr = clientToUpdate === null || clientToUpdate === void 0 ? void 0 : clientToUpdate.projects.filter(project => project.id !== args.id);
                clientToUpdate.projects = newProjArr || [];
                yield (clientToUpdate === null || clientToUpdate === void 0 ? void 0 : clientToUpdate.save());
                return projectToRemove;
            }
            return null;
        }),
        deleteClient: (root, args) => __awaiter(void 0, void 0, void 0, function* () {
            const clientToRemove = yield Client.findByIdAndRemove(args.id);
            return clientToRemove;
        })
    }
};
