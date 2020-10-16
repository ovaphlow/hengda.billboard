const Router = require("@koa/router");
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const config = require("../config");
const console = require("../logger");

const proto = grpc.loadPackageDefinition(
	protoLoader.loadSync(`${__dirname}/../proto/jobFair.proto`, {
		keepCase: true,
		longs: String,
		enums: String,
		defaults: true,
		oneofs: true,
	})
).jobFair;

const grpcClient = new proto.JobFair(
	`${config.grpcServer.host}:${config.grpcServer.port}`,
	grpc.credentials.createInsecure()
);

const router = new Router({
	prefix: "/api/job-fair",
});

module.exports = router;

router.get("/:id/", async (ctx) => {
	const grpcFetch = (body) =>
		new Promise((resolve, reject) => {
			grpcClient.get(body, (err, response) => {
				if (err) {
					console.error(err);
					reject(err);
				} else {
					resolve(JSON.parse(response.data));
				}
			});
		});
	try {
		ctx.response.body = await grpcFetch(ctx.params);
	} catch (err) {
		console.error(err);
		ctx.response.body = { message: "服务器错误" };
	}
});


router.put("/edit/", async (ctx) => {
	const grpcFetch = (body) =>
		new Promise((resolve, reject) => {
			grpcClient.update(body, (err, response) => {
				if (err) {
					console.error(err);
					reject(err);
				} else {
					
					resolve(JSON.parse(response.data));
				}
			});
		});
	try {
		ctx.response.body = await grpcFetch({
      job_fair_id: ctx.request.body.job_fair_id,
      ent_id:ctx.request.body.ent_id,
      ent_uuid:ctx.request.body.ent_uuid,
      recruitment_id: JSON.stringify(ctx.request.body.recruitment_id) 
    });
	} catch (err) {
		console.error(err);
		ctx.response.body = { message: "服务器错误" };
	}
});

router.put("/:id", async (ctx) => {
	const grpcFetch = (body) =>
		new Promise((resolve, reject) => {
			grpcClient.search(body, (err, response) => {
				if (err) {
					console.error(err);
					reject(err);
				} else {
					resolve(JSON.parse(response.data));
				}
			});
		});
	try {
		ctx.response.body = await grpcFetch({
      ent_id: ctx.params.ent_id,
      ent_uuid: ctx.query.ent_uuid
    });
	} catch (err) {
		console.error(err);
		ctx.response.body = { message: "服务器错误" };
	}
});

router.get("/ent/:job_fair_id/", async (ctx) => {
	const grpcFetch = (body) =>
		new Promise((resolve, reject) => {
			grpcClient.enterpriseList(body, (err, response) => {
				if (err) {
					console.error(err);
					reject(err);
				} else {
					resolve(JSON.parse(response.data));
				}
			});
		});
	try {
    console.info(ctx.params)
		ctx.response.body = await grpcFetch(ctx.params);
	} catch (err) {
		console.error(err);
		ctx.response.body = { message: "服务器错误" };
	}
});

router.get("/ent/recruitment/:job_fair_id/:ent_id", async (ctx) => {
  console.info('xxx')
	const grpcFetch = (body) =>
		new Promise((resolve, reject) => {
			grpcClient.entRecruitmentList(body, (err, response) => {
				if (err) {
					console.error(err);
					reject(err);
				} else {
					resolve(JSON.parse(response.data));
				}
			});
		});
	try {
		ctx.response.body = await grpcFetch({
      ...ctx.params,
      ent_uuid: ctx.query.ent_uuid
    });
	} catch (err) {
		console.error(err);
		ctx.response.body = { message: "服务器错误" };
	}
});

router.get("/recruitment/:job_fair_id", async (ctx) => {
	const grpcFetch = (body) =>
		new Promise((resolve, reject) => {
			grpcClient.recruitmentList(body, (err, response) => {
				if (err) {
					console.error(err);
					reject(err);
				} else {
					resolve(JSON.parse(response.data));
				}
			});
		});
	try {
		ctx.response.body = await grpcFetch(ctx.params);
	} catch (err) {
		console.error(err);
		ctx.response.body = { message: "服务器错误" };
	}
});