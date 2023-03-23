import { namespaceWrapper } from "../namespaceWrapper";

export const fetchLinktree = async (req:any, res: any) => {
    try {
      console.log(req)
        await namespaceWrapper.storeSet("linktree", "testing") // * Set value to db 
        const Linktrees = await namespaceWrapper.storeGet("linktree"); // * Get value from db
        if (Linktrees) {
          console.log('linktrees =' + Linktrees);
          res.status(200).send(Linktrees); // * print db
        }
      } catch (err) {
        console.log('Catch in Linktrees', err);
      }
};
