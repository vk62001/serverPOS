const {
  ticketsRemesas,
  updateTicketsRemesas,
} = require("../controllers/ticketsRemesas");

const router = require("express").Router();

router.post("/", ticketsRemesas);

router.put("/", updateTicketsRemesas);

module.exports = router;
