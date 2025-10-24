import { clientService } from '../services/index.ts';
import ApiError from '../utils/ApiError.ts';
import catchAsyncWithAuth from '../utils/catchAsyncWithAuth.ts';
import httpStatus from 'http-status';

const createClient = catchAsyncWithAuth(async (req, res, next) => {
    const { name, accountIds, relationshipManager, status } = req.body;
    const client = await clientService.createClient(name, accountIds, relationshipManager, status);
    res.status(httpStatus.CREATED).send(client);
});

const getClients = catchAsyncWithAuth(async (req, res, next) => {
    const result = await clientService.getAllClients();
    res.send(result);
});

const getClient = catchAsyncWithAuth(async (req, res, next) => {
    const client = await clientService.getClientById(req.params.clientId);
    if (!client) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Client not found');
    }
    res.send(client);
});

const updateClient = catchAsyncWithAuth(async (req, res, next) => {
    const client = await clientService.updateClientById(req.params.clientId, req.body);
    res.send(client);
});

const deleteClient = catchAsyncWithAuth(async (req, res, next) => {
    await clientService.deleteClientById(req.params.clientId);
    res.status(httpStatus.NO_CONTENT).send();
});

export default {
    createClient,
    getClients,
    getClient,
    updateClient,
    deleteClient
};
