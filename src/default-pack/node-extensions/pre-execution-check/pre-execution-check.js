export class PreExecutionCheckExtension {
  constructor(node) {
    this.node = node;
    this.defaultColor = node.color;
    this.defaultBgColor = node.bgcolor;
    this.defaultTooltip = node.properties.tooltip;
    this.errorStyle = { bgcolor: "#96000c", color: "#750000" };
    node.on("nodeStatusUpdated", this.handleStatusUpdate.bind(this));
  }

  hasPrecheckAlarms(nodeStatus) {
    if (Array.isArray(nodeStatus.extensions)) {
      for (let extension of nodeStatus.extensions) {
        if (
          extension.name === "precheck" &&
          Array.isArray(extension.alarms) &&
          extension.alarms.length > 0
        ) {
          return true;
        }
      }
    }
    return false;
  }

  getFirstAlarm(nodeStatus) {
    for (const extension of nodeStatus.extensions ?? []) {
      if (extension.name === "precheck" && extension.alarms?.length > 0) {
        const firstAlarm = extension.alarms[0];
        return `${firstAlarm.message} : ${firstAlarm.reason}`;
      }
    }

    return null;
  }

  handleStatusUpdate(status) {
    const color = this.node.color;
    const bgcolor = this.node.bgcolor;

    if (this.hasPrecheckAlarms(status)) {
      this.node.color = this.errorStyle.color;
      this.node.bgcolor = this.errorStyle.bgcolor;
      this.node.properties.tooltip = this.getFirstAlarm(status);
    } else {
      this.node.color = this.defaultColor;
      this.node.bgcolor = this.defaultBgColor;
      this.node.properties.tooltip = this.defaultTooltip;
    }

    if (color !== this.node.color || bgcolor !== this.node.bgcolor) {
      this.node.setDirtyCanvas(true, true);
    }
  }
}
