const express = require("express");
const db = require("../db");
const rootController = require("../controllers");
const rootChecks = require("../utilis");
const { multer } = require("../middlewares");

const router = express.Router();

module.exports = (passport) => {
  router.get("/", db.users.findIfLoggedin, (req, res) => {
    res.render("home", {
      user: req.user,
    });
  });

  router.get("/login", (req, res) => {
    res.render("login", {
      message: req.flash("error"),
    });
  });

  router.post(
    "/login", passport
      .authenticate("local", { failureRedirect: "login", failureFlash: true }),
    (req, res) => {
      res.redirect("/");
    },
  );

  router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  router.post("/entities", db.users.findIfLoggedin, (req, res) => {
    if (req.body.username) {
      rootController.getToken(req, res, "entities");
    } else {
      rootController.getEntityAll(req, res);
    }
  });

  router.post("/index", db.users.findIfLoggedin, (req, res) => {
    if (req.body.username) {
      rootController.getToken(req, res, "detailshome");
    } else {
      rootController.getEntitySingle(req, res);
    }
  });

  router.post("/indextype", db.users.findIfLoggedin, (req, res) => {
    if (req.body.username) {
      rootController.getToken(req, res, "typehome");
    } else {
      rootController.getEntityType(req, res);
    }
  });

  router.get("/detailshome", db.users.findIfLoggedin, (req, res) => {
    res.render("detailshome", {
      data: `/deusto/w4t/${ req.user.username }/real`,
    });
  });

  router.get("/details", db.users.findIfLoggedin, (req, res) => {
    res.render("details");
  });

  router.get("/upload", db.users.findIfLoggedin, (req, res) => {
    res.render("upload", {
      data: `/deusto/w4t/${ req.user.username }/real`,
    });
  });

  router.get("/update", db.users.findIfLoggedin, (req, res) => {
    res.render("update", {
      data: `/deusto/w4t/${ req.user.username }/real`,
    });
  });

  router.get("update", db.users.findIfLoggedin, (req, res) => {
    res.render("entities", {
      data: `/deusto/w4t/${ req.user.username }/real`,
    });
  });

  router.get("/entitieshome", db.users.findIfLoggedin, (req, res) => {
    res.render("entities", {
      data: `/deusto/w4t/${ req.user.username }/real`,
    });
  });

  router.get("/typehome", db.users.findIfLoggedin, (req, res) => {
    res.render("typehome");
  });
  router.get("/rules", db.users.findIfLoggedin, (req, res) => {
    res.render("rules");
  });

  router.post("/rules", db.users.findIfLoggedin, (req, res) => {
    if (!req.body.rule) {
      rootController.getRules(req, res);
    } else {
      rootController.getRule(req, res);
    }
  });

  router.post("/upload", db.users.findIfLoggedin, multer, (req, res) => {
    if (req.body.username) {
      rootController.getToken(req, res, "upload");
    } else if (!rootChecks.userServicePath(req, res)) {
      const pathSplit = req.body.fiwareServicePathUpload.split("/");
      res.render("upload", {
        msg: `U cannot create items logged as ${ req.user.username } user on path
        avaible only to ${ pathSplit[ 3 ] } user`,
      });
    } else {
      rootController.postEntity(req, res);
    }
  });

  router.post("/update", db.users.findIfLoggedin, multer, (req, res) => {
    if (req.body.username) {
      rootController.getToken(req, res, "update");
    } else if (!rootChecks.userServicePath(req, res)) {
      const pathSplit = req.body.fiwareServicePathUpload.split("/");
      res.render("update", {
        msg: `U cannot create items logged as ${ req.user.username } user on path
        avaible only to ${ pathSplit[ 3 ] } user`,
      });
    } else {
      rootController.postEntityUpdate(req, res);
    }
  });
  return router;
};
