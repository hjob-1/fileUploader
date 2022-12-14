import  fs  from 'fs';
import Files from '../models/file';

const fileUpload =  async (req, res) => {
        if (req.file.size > 10485760){// 10^6 bytes maximum
            res.send({message:"file size shouldn't be greater than 10MB", error:true});
        }
        else{
            const {buffer, originalname} = req.file;

            await fs.promises.writeFile(`./uploads/${originalname}`, buffer)
            .then(async()=>{
                   const {size, originalname} = req.file;
                   const date =  new Date().toString();
                   await Files.create({name:originalname, size:size,uploadedAt:new Date().toString(), path:`./uploads/${originalname}` })
                   return res.send({message:"file uploaded", error:false})
        })
            .catch(()=>{
                res.send({message:'something went wrong try again', error:true})
            })
            
        }
}
const getFile = async(req ,res) =>{

    const selectedfiles = await Files.findAll();

  res.send(selectedfiles);
}
const deleteFile = async(req, res)=>{
    try{
            fs.unlink(`./uploads/${req.body.name}`, async (err)=>{
            await Files.destroy({where:{id:req.params.id.toString()}})
            res.send({message:"file deleted"});
            })
        }
    catch(err){
        res.send({message:"error while finding the file"})
    }
}



export{fileUpload, getFile, deleteFile};