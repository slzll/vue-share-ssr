import "./social-share/js/social-share";

const socialShare = window.socialShare || {};

const socialShareDirective = globalConfig => {
  const getInstanceName = (el, binding, vnode) => {
    let instanceName = null;
    if (binding.arg) {
      instanceName = binding.arg;
    } else if (vnode.data.attrs && (vnode.data.attrs.instanceName || vnode.data.attrs["instance-name"])) {
      instanceName = vnode.data.attrs.instanceName || vnode.data.attrs["instance-name"];
    } else if (el.id) {
      instanceName = el.id;
    }
    return instanceName || "share";
  };

  return {
    // Init
    bind(el, binding, vnode) {
      if (!el.className.includes("social-share-ssr")) {
        el.className += (el.className ? " " : "") + "social-share-ssr";
      }
    },
    // DOM Inserted
    inserted(el, binding, vnode) {
      const self = vnode.context;
      const options = binding.value;
      const instanceName = getInstanceName(el, binding, vnode);
      let share = self[instanceName];

      const config = { ...globalConfig, ...options };
      share = self[instanceName] = socialShare(el, config);
    },
    // Parse options change
    componentUpdated(el, binding, vnode) {
      const instanceName = getInstanceName(el, binding, vnode);
      const options = binding.value;
      const children = el.childNodes;
      // fix removeChild Error
      while (children.length > 0) {
        el.removeChild(children[0]);
      }
      let share = vnode.context[instanceName];
      el.initialized = false;
      const config = { ...globalConfig, ...options };
      share = socialShare(el, config);
    },

    // Destroy this directive
    unbind(el, binding, vnode) {
      const instanceName = getInstanceName(el, binding, vnode);
      const share = vnode.context[instanceName];
      if (share) {
        delete vnode.context[instanceName];
      }
    }
  };
};

const install = (Vue, globalConfig = {}) => {
  Vue.directive("share", socialShareDirective(globalConfig));
};

const VueSocialShareSSR = { install };

export default VueSocialShareSSR;
