import ajv from "./ajvInstance.js";

const schema = {
  type: "object",
  properties: {
    name: {type: "string",  maxLength: 50},
    tagline: {type: "string"},
    schedule: {type: "string", format: "date-time"},
    description: {type: "string"},
    moderator: {type: "string"},
    category: {type: "string"},
    sub_category: {type: "string"},
    rigor_rank: { type: "string" },
  },
  required: ["name", "tagline", "schedule", "description", "moderator"],
  additionalProperties: false,
};

const validate = ajv.compile(schema);

export default validate;