import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export default async function getCrushEditorState(req: Request, res: Response, userId: number, prisma: PrismaClient) {
  const editorState = await prisma.crushEditorState.findUnique({
    where: {
      userId_day: {
        userId,
        day: req.params.crushEditorDay
      }
    }
  })
  if (editorState != null) {
    res.json({"status": "ok", crushEditor: editorState})
  } else {
    res.json({"status": "ok", crushEditor: {value: "", day: req.params.crushEditorDay}})
  }
}