import { Data, Effect } from 'effect';
import Dockerode from 'dockerode';

export class DockerError extends Data.TaggedError('DockerError')<{
  error: unknown;
}> {}

class DockerContainer {
  private readonly container: Dockerode.Container;

  readonly id: Dockerode.Container['id'];
  readonly modem: Dockerode.Container['modem'];

  constructor(container: Dockerode.Container) {
    this.container = container;
    this.id = container.id;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.modem = container.modem;
  }

  inspect = (options?: Dockerode.ContainerInspectOptions) =>
    Effect.tryPromise({
      try: () => this.container.inspect(options),
      catch: error => new DockerError({ error }),
    });

  rename = (options: Record<string, never>) =>
    Effect.tryPromise({
      try: () => this.container.rename(options),
      catch: error => new DockerError({ error }),
    });

  update = (options: Record<string, never>) =>
    Effect.tryPromise({
      try: () => this.container.update(options),
      catch: error => new DockerError({ error }),
    });

  top = (options?: Record<string, never>) =>
    Effect.tryPromise({
      try: () => this.container.top(options),
      catch: error => new DockerError({ error }),
    });

  changes = (options?: Record<string, never>) =>
    Effect.tryPromise({
      try: () => this.container.changes(options),
      catch: error => new DockerError({ error }),
    });

  export = (options?: Record<string, never>) =>
    Effect.tryPromise({
      try: () => this.container.export(options),
      catch: error => new DockerError({ error }),
    });

  start = (options?: Dockerode.ContainerStartOptions) =>
    Effect.tryPromise({
      try: () => this.container.start(options),
      catch: error => new DockerError({ error }),
    });

  pause = (options?: Record<string, never>) =>
    Effect.tryPromise({
      try: () => this.container.pause(options),
      catch: error => new DockerError({ error }),
    });

  unpause = (options?: Record<string, never>) =>
    Effect.tryPromise({
      try: () => this.container.unpause(options),
      catch: error => new DockerError({ error }),
    });

  exec = (options: Dockerode.ExecCreateOptions) =>
    Effect.tryPromise({
      try: () => this.container.exec(options),
      catch: error => new DockerError({ error }),
    });

  commit = (options?: Record<string, never>) =>
    Effect.tryPromise({
      try: () => this.container.commit(options),
      catch: error => new DockerError({ error }),
    });

  stop = (options?: Dockerode.ContainerStopOptions) =>
    Effect.tryPromise({
      try: () => this.container.stop(options),
      catch: error => new DockerError({ error }),
    });

  restart = (options?: Record<string, never>) =>
    Effect.tryPromise({
      try: () => this.container.restart(options),
      catch: error => new DockerError({ error }),
    });

  kill = (options?: Record<string, never>) =>
    Effect.tryPromise({
      try: () => this.container.kill(options),
      catch: error => new DockerError({ error }),
    });

  resize = (options?: Record<string, never>) =>
    Effect.tryPromise({
      try: () => this.container.resize(options),
      catch: error => new DockerError({ error }),
    });

  wait = (options?: Dockerode.ContainerWaitOptions) =>
    Effect.tryPromise({
      try: () => this.container.wait(options),
      catch: error => new DockerError({ error }),
    });

  remove = (options?: Dockerode.ContainerRemoveOptions) =>
    Effect.tryPromise({
      try: () => this.container.remove(options),
      catch: error => new DockerError({ error }),
    });

  copy = (options?: Record<string, never>) =>
    Effect.tryPromise({
      try: () => this.container.copy(options),
      catch: error => new DockerError({ error }),
    });

  getArchive = (options: Record<string, never>) =>
    Effect.tryPromise({
      try: () => this.container.getArchive(options),
      catch: error => new DockerError({ error }),
    });

  infoArchive = (options: Record<string, never>) =>
    Effect.tryPromise({
      try: () => this.container.infoArchive(options),
      catch: error => new DockerError({ error }),
    });

  putArchive = (
    file: string | Buffer | NodeJS.ReadableStream,
    options: Record<string, never>,
  ) =>
    Effect.tryPromise({
      try: () => this.container.putArchive(file, options),
      catch: error => new DockerError({ error }),
    });

  logs = (
    options?: Dockerode.ContainerLogsOptions & { follow?: false },
  ): Effect.Effect<Buffer, DockerError> =>
    Effect.tryPromise({
      try: () => this.container.logs(options),
      catch: error => new DockerError({ error }),
    });

  logsStream = (
    options: Dockerode.ContainerLogsOptions & { follow: true },
  ): Effect.Effect<NodeJS.ReadableStream, DockerError> =>
    Effect.tryPromise({
      try: () => this.container.logs(options),
      catch: error => new DockerError({ error }),
    });

  stats = (options?: {
    stream?: false;
    'one-shot'?: boolean;
  }): Effect.Effect<Dockerode.ContainerStats, DockerError> =>
    Effect.tryPromise({
      try: () => this.container.stats(options),
      catch: error => new DockerError({ error }),
    });

  statsStream = (options: {
    stream: true;
  }): Effect.Effect<NodeJS.ReadableStream, DockerError> =>
    Effect.tryPromise({
      try: () => this.container.stats(options),
      catch: error => new DockerError({ error }),
    });

  attach = (options: Dockerode.ContainerAttachOptions) =>
    Effect.tryPromise({
      try: () => this.container.attach(options),
      catch: error => new DockerError({ error }),
    });
}

class DockerClient {
  private readonly client: Dockerode;

  constructor() {
    this.client = new Dockerode();
  }

  // Container Operations
  listContainers = (options?: Dockerode.ContainerListOptions) =>
    Effect.tryPromise({
      try: () => this.client.listContainers(options),
      catch: error => new DockerError({ error }),
    });

  createContainer = (options: Dockerode.ContainerCreateOptions) =>
    Effect.tryPromise({
      try: () => this.client.createContainer(options),
      catch: error => new DockerError({ error }),
    }).pipe(Effect.map(container => new DockerContainer(container)));

  getContainer = (id: string) =>
    new DockerContainer(this.client.getContainer(id));

  // Image Operations
  listImages = (options?: Dockerode.ListImagesOptions) =>
    Effect.tryPromise({
      try: () => this.client.listImages(options),
      catch: error => new DockerError({ error }),
    });

  createImage = (
    options: Record<string, never>,
    auth?: unknown,
  ): Effect.Effect<NodeJS.ReadableStream, DockerError> => {
    if (auth !== undefined) {
      return Effect.tryPromise({
        try: () => this.client.createImage(auth, options),
        catch: error => new DockerError({ error }),
      });
    }
    return Effect.tryPromise({
      try: () => this.client.createImage(options),
      catch: error => new DockerError({ error }),
    });
  };

  loadImage = (
    file: string | NodeJS.ReadableStream,
    options?: Record<string, never>,
  ) =>
    Effect.tryPromise({
      try: () => this.client.loadImage(file, options),
      catch: error => new DockerError({ error }),
    });

  importImage = (
    file: string | NodeJS.ReadableStream,
    options?: Record<string, never>,
  ) =>
    Effect.tryPromise({
      try: () => this.client.importImage(file, options),
      catch: error => new DockerError({ error }),
    });

  buildImage = (
    file: string | NodeJS.ReadableStream | Dockerode.ImageBuildContext,
    options?: Dockerode.ImageBuildOptions,
  ) =>
    Effect.tryPromise({
      try: () => this.client.buildImage(file, options),
      catch: error => new DockerError({ error }),
    });

  searchImages = (options: Record<string, never>) =>
    Effect.tryPromise({
      try: () => this.client.searchImages(options),
      catch: error => new DockerError({ error }),
    });

  pruneImages = (options?: Record<string, never>) =>
    Effect.tryPromise({
      try: () => this.client.pruneImages(options),
      catch: error => new DockerError({ error }),
    });

  getImage = (name: string) => this.client.getImage(name);

  pull = (repoTag: string, options?: Record<string, never>) =>
    Effect.tryPromise({
      try: () => this.client.pull(repoTag, options),
      catch: error => new DockerError({ error }),
    });

  // Volume Operations
  listVolumes = (options?: Dockerode.VolumeListOptions) =>
    Effect.tryPromise({
      try: () => this.client.listVolumes(options),
      catch: error => new DockerError({ error }),
    });

  createVolume = (options?: Dockerode.VolumeCreateOptions) =>
    Effect.tryPromise({
      try: () => this.client.createVolume(options),
      catch: error => new DockerError({ error }),
    });

  pruneVolumes = (options?: Dockerode.VolumePruneOptions) =>
    Effect.tryPromise({
      try: () => this.client.pruneVolumes(options),
      catch: error => new DockerError({ error }),
    });

  getVolume = (name: string) => this.client.getVolume(name);

  // Network Operations
  listNetworks = (options?: Dockerode.NetworkListOptions) =>
    Effect.tryPromise({
      try: () => this.client.listNetworks(options),
      catch: error => new DockerError({ error }),
    });

  createNetwork = (options: Dockerode.NetworkCreateOptions) =>
    Effect.tryPromise({
      try: () => this.client.createNetwork(options),
      catch: error => new DockerError({ error }),
    });

  pruneNetworks = (options?: Record<string, never>) =>
    Effect.tryPromise({
      try: () => this.client.pruneNetworks(options),
      catch: error => new DockerError({ error }),
    });

  getNetwork = (id: string) => this.client.getNetwork(id);

  // Service/Swarm Operations
  listServices = (options?: Dockerode.ServiceListOptions) =>
    Effect.tryPromise({
      try: () => this.client.listServices(options),
      catch: error => new DockerError({ error }),
    });

  createService = (
    options: Dockerode.CreateServiceOptions,
    auth?: Dockerode.AuthConfig,
  ): Effect.Effect<Dockerode.Service, DockerError> => {
    if (auth !== undefined) {
      return Effect.tryPromise({
        try: () =>
          this.client.createService(auth, options as Dockerode.ServiceSpec),
        catch: error => new DockerError({ error }),
      });
    }
    return Effect.tryPromise({
      try: () => this.client.createService(options),
      catch: error => new DockerError({ error }),
    });
  };

  listTasks = (options?: Record<string, never>) =>
    Effect.tryPromise({
      try: () => this.client.listTasks(options),
      catch: error => new DockerError({ error }),
    });

  listNodes = (options?: Dockerode.NodeListOptions) =>
    Effect.tryPromise({
      try: () => this.client.listNodes(options),
      catch: error => new DockerError({ error }),
    });

  getService = (id: string) => this.client.getService(id);

  getTask = (id: string) => this.client.getTask(id);

  getNode = (id: string) => this.client.getNode(id);

  swarmInit = (options: Record<string, never>) =>
    Effect.tryPromise({
      try: () => this.client.swarmInit(options),
      catch: error => new DockerError({ error }),
    });

  swarmJoin = (options: Record<string, never>) =>
    Effect.tryPromise({
      try: () => this.client.swarmJoin(options),
      catch: error => new DockerError({ error }),
    });

  swarmLeave = (options: Record<string, never>) =>
    Effect.tryPromise({
      try: () => this.client.swarmLeave(options),
      catch: error => new DockerError({ error }),
    });

  swarmUpdate = (options: Record<string, never>) =>
    Effect.tryPromise({
      try: () => this.client.swarmUpdate(options),
      catch: error => new DockerError({ error }),
    });

  swarmInspect = () =>
    Effect.tryPromise({
      try: () => this.client.swarmInspect(),
      catch: error => new DockerError({ error }),
    });

  // Secret/Config Operations
  listSecrets = (options?: Record<string, never>) =>
    Effect.tryPromise({
      try: () => this.client.listSecrets(options),
      catch: error => new DockerError({ error }),
    });

  createSecret = (options: Record<string, never>) =>
    Effect.tryPromise({
      try: () => this.client.createSecret(options),
      catch: error => new DockerError({ error }),
    });

  listConfigs = (options?: Record<string, never>) =>
    Effect.tryPromise({
      try: () => this.client.listConfigs(options),
      catch: error => new DockerError({ error }),
    });

  createConfig = (options: Record<string, never>) =>
    Effect.tryPromise({
      try: () => this.client.createConfig(options),
      catch: error => new DockerError({ error }),
    });

  getSecret = (id: string) => this.client.getSecret(id);

  getConfig = (id: string) => this.client.getConfig(id);

  // Plugin Operations
  listPlugins = (options?: Record<string, never>) =>
    Effect.tryPromise({
      try: () => this.client.listPlugins(options),
      catch: error => new DockerError({ error }),
    });

  createPlugin = (options: Record<string, never>) =>
    Effect.tryPromise({
      try: () => this.client.createPlugin(options),
      catch: error => new DockerError({ error }),
    });

  getPlugin = (name: string, remote?: unknown) =>
    this.client.getPlugin(name, remote);

  // System/Info Operations
  info = () =>
    Effect.tryPromise({
      try: () => this.client.info(),
      catch: error => new DockerError({ error }),
    });

  df = () =>
    Effect.tryPromise({
      try: () => this.client.df(),
      catch: error => new DockerError({ error }),
    });

  version = () =>
    Effect.tryPromise({
      try: () => this.client.version(),
      catch: error => new DockerError({ error }),
    });

  ping = () =>
    Effect.tryPromise({
      try: () => this.client.ping(),
      catch: error => new DockerError({ error }),
    });

  getEvents = (options?: Dockerode.GetEventsOptions) =>
    Effect.tryPromise({
      try: () => this.client.getEvents(options),
      catch: error => new DockerError({ error }),
    });

  pruneContainers = (options?: Record<string, never>) =>
    Effect.tryPromise({
      try: () => this.client.pruneContainers(options),
      catch: error => new DockerError({ error }),
    });

  pruneBuilder = (options?: Dockerode.PruneBuilderOptions) =>
    Effect.tryPromise({
      try: () => this.client.pruneBuilder(options),
      catch: error => new DockerError({ error }),
    });

  checkAuth = (options: unknown) =>
    Effect.tryPromise({
      try: () => this.client.checkAuth(options),
      catch: error => new DockerError({ error }),
    });

  // Container Run Operation
  run(
    image: string,
    cmd: string[],
    outputStream: NodeJS.WritableStream | NodeJS.WritableStream[],
    createOptions?: Dockerode.ContainerCreateOptions,
    startOptions?: Dockerode.ContainerStartOptions,
  ): Effect.Effect<unknown, DockerError> {
    return Effect.tryPromise({
      try: () =>
        this.client.run(image, cmd, outputStream, createOptions, startOptions),
      catch: error => new DockerError({ error }),
    });
  }

  // Exec Operations
  getExec = (id: string) => this.client.getExec(id);
}

export class Docker extends Effect.Service<Docker>()('Docker', {
  effect: Effect.sync(() => new DockerClient()),
}) {}
