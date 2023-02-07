import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import axios from "axios";
import config from "./config";

export const app = express();
export const prisma = new PrismaClient();

app.use(express.json());

// Get all orders
// This is the Route for getting information on all orders via GET Method
app.get("/orders", async (req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            images: true,
          },
        },
      },
    });

    res.json(orders);
  } catch (error) {
    throw error;
  }
});

// Get one order
// This is the Route for getting one order's information via GET Method
app.get("/orders/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        items: {
          include: {
            images: true,
          },
        },
      },
    });

    res.json(order);
  } catch (error) {
    throw error;
  }
});

// Shopify Webhook
// This is the Route for receiving webhook notifications from Shopify
app.post("/orders", async (req: Request, res: Response, next) => {
  try {
    /// Store new order info.
    await prisma.order.create({
      data: {
        shopifyOrderId: req.body.id,
        customerName: `${req.body.customer.first_name} ${req.body.customer.last_name}`,
        orderDate: req.body.created_at,
        items: {
          create: (await generateItems(req.body.line_items)) as never,
        },
      },
    });

    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

if (process.env.NODE_ENV != "test") {
  app.listen(8100, () => {
    console.log("Express server is running on port 8100");
  });
}

const generateItems = async (line_items: any[]) => {
  try {
    const generateLineItems = line_items.map(async (item) => {
      /// Pull this item's images
      const images = await getItemImages(item.product_id);
      return { name: item.name, price: item.price, images } as never;
    });

    return await Promise.all(generateLineItems);
  } catch (error) {
    throw error;
  }
};

const getItemImages = async (itemId: number) => {
  try {
    const headers: any = {
      "X-Shopify-Access-Token": config.SHOPIFY_ACCESS_TOKEN,
    };

    /// We need to send a request to shopify to receive their product info.
    const itemData = await axios.get(
      `https://salehogs.myshopify.com/admin/api/2022-10/products/${itemId}.json`,
      {
        headers: headers,
      }
    );

    const productImages = itemData.data.product.images.map((image: any) => {
      return { url: image.src };
    });

    return {
      create: productImages,
    };
  } catch (error) {
    throw error;
  }
};
