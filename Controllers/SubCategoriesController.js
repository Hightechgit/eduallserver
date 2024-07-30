const SubCategorieSchema = require("../Models/SubCategories");


async function GetSubCategories(req, res){
    try {
        let SubCategoriesList = await SubCategorieSchema.find();
        res.status(200).json(SubCategoriesList);
    } catch (error) {
       res.status(500).json({message:"Something went wrong while loading all subcategories", error:error});
    }
}

async function AddNewSubCategorie(req, res){
    let val = [
        {
          _id: "665f0738895b0ecccf8ef0ad",
          subcategorie_name: "Secadores",
          subcategorie_categorie: "665f0704895b0ecccf8ef0ab",
          subcategorie_registerDate: "2024-06-04T12:23:20.328Z",
          __v: 0
        },
        {
          _id: "665f0748895b0ecccf8ef0af",
          subcategorie_name: "Filtros",
          subcategorie_categorie: "665f0704895b0ecccf8ef0ab",
          subcategorie_registerDate: "2024-06-04T12:23:36.447Z",
          __v: 0
        },
        {
          _id: "665f0774895b0ecccf8ef0b1",
          subcategorie_name: "Tratamento de condensados",
          subcategorie_categorie: "665f0704895b0ecccf8ef0ab",
          subcategorie_registerDate: "2024-06-04T12:24:20.334Z",
          __v: 0
        },
        {
          _id: "665f07d6895b0ecccf8ef0b5",
          subcategorie_name: "Reservatórios horizontais",
          subcategorie_categorie: "665f079b895b0ecccf8ef0b3",
          subcategorie_registerDate: "2024-06-04T12:25:58.197Z",
          __v: 0
        },
        {
          _id: "665f07e4895b0ecccf8ef0b7",
          subcategorie_name: "Reservatórios verticais",
          subcategorie_categorie: "665f079b895b0ecccf8ef0b3",
          subcategorie_registerDate: "2024-06-04T12:26:12.553Z",
          __v: 0
        },
        {
          _id: "665f0a2b895b0ecccf8ef0bb",
          subcategorie_name: "Linhas de ar comprimido",
          subcategorie_categorie: "665f09d7895b0ecccf8ef0b9",
          subcategorie_registerDate: "2024-06-04T12:35:55.586Z",
          __v: 0
        },
        {
          _id: "665f0a80895b0ecccf8ef0bf",
          subcategorie_name: "Eletró-Válvulas",
          subcategorie_categorie: "665f0a59895b0ecccf8ef0bd",
          subcategorie_registerDate: "2024-06-04T12:37:20.659Z",
          __v: 0
        },
        {
          _id: "665f0a96895b0ecccf8ef0c1",
          subcategorie_name: "Acessórios de encaixe  rápido",
          subcategorie_categorie: "665f0a59895b0ecccf8ef0bd",
          subcategorie_registerDate: "2024-06-04T12:37:42.991Z",
          __v: 0
        },
        {
          _id: "665f0ab0895b0ecccf8ef0c3",
          subcategorie_name: "Série FRL EVO",
          subcategorie_categorie: "665f0a59895b0ecccf8ef0bd",
          subcategorie_registerDate: "2024-06-04T12:38:08.922Z",
          __v: 0
        },
        {
          _id: "665f0abf895b0ecccf8ef0c5",
          subcategorie_name: "Série FRL Mini",
          subcategorie_categorie: "665f0a59895b0ecccf8ef0bd",
          subcategorie_registerDate: "2024-06-04T12:38:23.333Z",
          __v: 0
        },
        {
          _id: "665f0ade895b0ecccf8ef0c7",
          subcategorie_name: "Pistolas de ar",
          subcategorie_categorie: "665f0a59895b0ecccf8ef0bd",
          subcategorie_registerDate: "2024-06-04T12:38:54.338Z",
          __v: 0
        },
        {
          _id: "667450ccff7b3a85f8f69d87",
          subcategorie_name: "SECADORES DE ADSORÇÃO ADX-F",
          subcategorie_categorie: "665f0704895b0ecccf8ef0ab",
          subcategorie_registerDate: "2024-06-20T15:54:52.280Z",
          __v: 0
        },
        {
          _id: "668282539237c336e3de3865",
          subcategorie_name: "Bombas de vácuo de palhetas rotativas lubrificadas a óleo",
          subcategorie_categorie: "668280399237c336e3de35f2",
          subcategorie_registerDate: "2024-07-01T10:17:55.463Z",
          __v: 0
        },
        {
          _id: "6683da2a72d1339d1e3bacd3",
          subcategorie_name: "Compressores de palhetas rotativas lubrificados por gota de óleo",
          subcategorie_categorie: "668280399237c336e3de35f2",
          subcategorie_registerDate: "2024-07-02T10:44:58.455Z",
          __v: 0
        },
        {
          _id: "6684224672d1339d1e3bd271",
          subcategorie_name: "Sistemas de vácuo centralizados",
          subcategorie_categorie: "668280399237c336e3de35f2",
          subcategorie_registerDate: "2024-07-02T15:52:38.145Z",
          __v: 0
        },
        {
          _id: "6684252f72d1339d1e3bd56d",
          subcategorie_name: "Sistemas de vácuo especialmente projetados para aplicações RTM com resina",
          subcategorie_categorie: "668280399237c336e3de35f2",
          subcategorie_registerDate: "2024-07-02T16:05:03.072Z",
          __v: 0
        },
        {
          _id: "66850ff672d1339d1e3bea24",
          subcategorie_name: "Aplicações especiais",
          subcategorie_categorie: "668280399237c336e3de35f2",
          subcategorie_registerDate: "2024-07-03T08:46:46.898Z",
          __v: 0
        },
        {
          _id: "6685248d72d1339d1e3bfccb",
          subcategorie_name: "Bombas de vácuo de parafuso seco BDRY",
          subcategorie_categorie: "668280399237c336e3de35f2",
          subcategorie_registerDate: "2024-07-03T10:14:37.226Z",
          __v: 0
        },
        {
          _id: "668536cf72d1339d1e3c0ef4",
          subcategorie_name: "Sistemas de vácuo médico com bombas 3/4 MEDEVICE",
          subcategorie_categorie: "668280399237c336e3de35f2",
          subcategorie_registerDate: "2024-07-03T11:32:31.842Z",
          __v: 0
        },
        {
          _id: "66855eed72d1339d1e3c2936",
          subcategorie_name: "Sistema de exaustão de gases anestésicos MEDEVICE",
          subcategorie_categorie: "668280399237c336e3de35f2",
          subcategorie_registerDate: "2024-07-03T14:23:41.155Z",
          __v: 0
        },
        {
          _id: "668561a172d1339d1e3c2deb",
          subcategorie_name: "Sistema de vácuo de tanque com 2 bombas",
          subcategorie_categorie: "668280399237c336e3de35f2",
          subcategorie_registerDate: "2024-07-03T14:35:13.809Z",
          __v: 0
        },
        {
          _id: "6685730172d1339d1e3c5c51",
          subcategorie_name: "Sistema de vácuo médico",
          subcategorie_categorie: "668280399237c336e3de35f2",
          subcategorie_registerDate: "2024-07-03T15:49:21.961Z",
          __v: 0
        },
        {
          _id: "6685739572d1339d1e3c5c5d",
          subcategorie_name: "Filtro bactericida",
          subcategorie_categorie: "668280399237c336e3de35f2",
          subcategorie_registerDate: "2024-07-03T15:51:49.173Z",
          __v: 0
        },
        {
          _id: "66866d6172d1339d1e3c9051",
          subcategorie_name: "acopladoras infinity",
          subcategorie_categorie: "66866cfa72d1339d1e3c904f",
          subcategorie_registerDate: "2024-07-04T09:37:37.427Z",
          __v: 0
        },
        {
          _id: "6686753572d1339d1e3c92a4",
          subcategorie_name: "Acessórios infinity",
          subcategorie_categorie: "665f0a59895b0ecccf8ef0bd",
          subcategorie_registerDate: "2024-07-04T10:11:01.943Z",
          __v: 0
        },
        {
          _id: "668677d272d1339d1e3c9829",
          subcategorie_name: "Pontos de venda",
          subcategorie_categorie: "665f0a59895b0ecccf8ef0bd",
          subcategorie_registerDate: "2024-07-04T10:22:10.623Z",
          __v: 0
        },
        {
          _id: "66867ea072d1339d1e3c9881",
          subcategorie_name: "Braçadeira de sela",
          subcategorie_categorie: "665f0a59895b0ecccf8ef0bd",
          subcategorie_registerDate: "2024-07-04T10:51:12.192Z",
          __v: 0
        }
      ]

   try { 
       for (let i = 0; i < val.length; i++) {
        const Numb = Math.random() * (1000000-1)+1*5+i
        const Inputs = new SubCategorieSchema({subcategorie_name:val[i].subcategorie_name,  subcategorie_code:Numb, subcategorie_categorie:val[i].subcategorie_categorie});
        const newCategory = await Inputs.save();
          if (i === (val.length-1)) {
            res.status(200).json(newCategory);
          }
       } 
   } catch (error) {
       res.status(500).json({message:"Something went wrong while trying to add a new category !", error:error});
   }
}

async function UpdateSubCategorie(req, res) {
    let UpdateSubCategorie = res.subcategorie;
    UpdateSubCategorie.subcategorie_name = req.body.name;
    UpdateSubCategorie.subcategorie_categorie = req.body.categorie;

    try {
       const Updated = await UpdateSubCategorie.save();
       res.status(201).json(Updated);
    } catch (error) {
        res.status(500).json({ message:"Error while updating the Subcategorie", error:error});        
    }
}

async function DeleteSubCategorie(req, res){
   try {
       await res.subcategorie.deleteOne();
       res.status(201).json({message:"Subcategorie deleted successfuly"});
   } catch (error) {
       res.status(401).json({message:"Something went wrong while deleting this Subcategorie", error:error});
   }
}

module.exports = {GetSubCategories, AddNewSubCategorie, UpdateSubCategorie, DeleteSubCategorie};