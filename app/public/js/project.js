// Generated by CoffeeScript 1.9.3
(function() {
  var AddProject, Member, MembersInput, Modal, Project, ProjectList, TextInput;

  Project = React.createClass({displayName: "Project",
    render: function() {
      return React.createElement("li", {
        "className": "",
        "aria-labelledby": "dropdownMenu"
      }, this.props.name);
    }
  });

  ProjectList = React.createClass({displayName: "ProjectList",
    getInitialState: function() {
      return {
        projects: []
      };
    },
    loadData: function() {
      var request;
      request = superagent;
      return request.get('/api/v1/projects').accept('application/json').end((function(err, res) {
        if (res.ok) {
          return this.setState({
            projects: res.body
          });
        }
      }).bind(this));
    },
    componentDidMount: function() {
      return this.loadData();
    },
    render: function() {
      var list;
      list = this.state.projects.map(function(project) {
        return React.createElement(Project, {
          "key": project._id,
          "name": project.name
        });
      });
      return React.createElement("div", {
        "className": "dropdown"
      }, React.createElement("button", {
        "className": "btn btn-default dropdown-toggle",
        "type": "button",
        "id": "dropdownMenu",
        "data-toggle": "dropdown",
        "aria-haspopup": "true",
        "aria-expanded": "true"
      }, (this.state.projects.length !== 0 ? this.state.projects[0].name : void 0), React.createElement("span", {
        "className": "caret"
      })), React.createElement("ul", {
        "className": "dropdown-menu"
      }, list));
    }
  });

  AddProject = React.createClass({displayName: "AddProject",
    loadData: function() {
      var request;
      request = superagent;
      return request.get('/api/v1/projects').accept('application/json').end((function(err, res) {
        if (res.ok) {
          return this.setState({
            projects: res.body
          });
        }
      }).bind(this));
    },
    render: function() {
      return React.createElement("a", {
        "data-toggle": "modal",
        "data-target": "#addModal",
        "className": "material-icons"
      }, "add");
    }
  });

  TextInput = React.createClass({displayName: "TextInput",
    render: function() {
      return React.createElement("div", {
        "className": "form-group"
      }, React.createElement("label", {
        "htmlFor": this.props.id
      }, this.props.placeholder), React.createElement("input", {
        "value": this.props.text,
        "type": "text",
        "className": "form-control",
        "id": this.props.id,
        "placeholder": this.props.placeholder
      }));
    }
  });

  Member = React.createClass({displayName: "Member",
    render: function() {
      return React.createElement("div", {
        "className": "row"
      }, React.createElement("div", {
        "className": "col-md-11"
      }, React.createElement("input", {
        "value": this.props.name,
        "type": "text",
        "className": "form-control",
        "placeholder": "Nom"
      })), React.createElement("div", {
        "className": "col-md-1"
      }, React.createElement("i", {
        "className": "material-icons",
        "onClick": this.props.del
      }, "delete")));
    }
  });

  MembersInput = React.createClass({displayName: "MembersInput",
    getInitialState: function() {
      return {
        members: this.props.members
      };
    },
    addMember: function() {
      var tmp;
      console.log('onAdd');
      tmp = this.state.members;
      tmp.push(' ');
      return this.setState({
        members: tmp
      });
    },
    deleteMember: function() {
      var tmp;
      console.log('onDelete');
      tmp = this.state.members;
      tmp.pop();
      return this.setState({
        members: tmp
      });
    },
    render: function() {
      var memberViews;
      memberViews = this.state.members.map(function(name) {
        return React.createElement(Member, {
          "name": name,
          "del": this.deleteMember
        });
      });
      return React.createElement("div", {
        "className": "form-group"
      }, React.createElement("label", null, "Collaborateurs"), memberViews, React.createElement("i", {
        "className": "material-icons",
        "onClick": this.addMember
      }, "add"));
    }
  });

  Modal = React.createClass({displayName: "Modal",
    getInitialState: function() {
      return {
        project: {
          name: '',
          description: '',
          git_repo: '',
          members: []
        }
      };
    },
    render: function() {
      var project;
      project = this.state.project;
      return React.createElement("form", null, React.createElement(TextInput, {
        "text": project.name,
        "id": "inputName",
        "placeholder": "Nom"
      }), React.createElement(TextInput, {
        "text": project.description,
        "id": "inputDescription",
        "placeholder": "Description"
      }), React.createElement(TextInput, {
        "text": project.git_repo,
        "id": "inputRepo",
        "placeholder": "Dépot git"
      }), React.createElement(MembersInput, {
        "members": project.members
      }));
    }
  });

  React.render(React.createElement(ProjectList, null), document.getElementById('content'));

  React.render(React.createElement(AddProject, null), document.getElementById('add'));

  React.render(React.createElement(Modal, null), document.getElementById('modal'));

}).call(this);