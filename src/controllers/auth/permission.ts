import { Request, Response } from "express";
import PermissionModel from "../../models/permission.model";
import { PermissionDocument } from "../../types/permission.types";

// global variable for the schema
const schema = PermissionModel;

export default class Permission {
  // @desc    Create Permission @access  Private
  // @route   POST /api/v1/permissions
  static async create(req: Request, res: Response) {
    try {
      const result = await schema.create<PermissionDocument>(req.body);
      return res.json({
        data: result,
        message: "Permission Created Successfuly",
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const results = await schema.find<PermissionDocument>();
      return res.json({ data: results });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async readOne(req: Request, res: Response) {
    try {
      const { _id } = req.params;
      const result = await schema.findById(_id);
      return res.json({ data: result });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const data: PermissionDocument = req.body;
      const result = await schema.findByIdAndUpdate<PermissionDocument>(
        { _id: data._id },
        { data },
        {
          new: true,
        }
      );
      return res.json({
        data: result,
        message: "Permission Updated Successfuly",
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async removeOne(req: Request, res: Response) {
    try {
      const { _id } = req.params;
      await schema.findByIdAndDelete(_id);
      return res.json({ message: "Permission Deleted Successfuly" });
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}
