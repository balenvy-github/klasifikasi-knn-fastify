export default function validateDto(ajvValidate: any) {
  return (request: any, reply: any, done: any) => {
    const valid = ajvValidate(request.body);
    if (!valid) {
      const { errors } = ajvValidate;
      reply.status(400).send(errors);
    }
    done();
  };
}
