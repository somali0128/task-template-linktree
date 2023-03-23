import { namespaceWrapper } from "../namespaceWrapper";

export const generateLinktree = async (req:any, res: any) => {
    try {
        console.log('data received=' + req);
        res.status(200).send(req); // * print db
      } catch (err) {
        console.log('Catch in Request', err);
        res.send('Catch in Request', err)
      }
};
