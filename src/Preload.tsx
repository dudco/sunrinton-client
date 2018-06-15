import * as React from 'react';
import ImageHelper from '../src/ImageHelper';

export interface PreloadProps {
    children: React.ReactNode;
    loadingIndicator: React.ReactNode;

    // Array of image urls to be preloaded
    images: string[];

    // If set, the preloader will automatically show
    // the children content after this amount of time
    autoResolveDelay: number,

    // Error callback. Is passed the error
    onError?: (e) => void,

    // Success callback
    onSuccess?: () => void,

    // Whether or not we should still show the content
    // even if there is a preloading error
    resolveOnError?: boolean,

    // Whether or not we should mount the child content after
    // images have finished loading (or after autoResolveDelay)
    mountChildren?: boolean,
}

export default class Preload extends React.Component<PreloadProps, any> {
    private mounted: boolean = false;
    private autoResolveTimeout;

    constructor(props) {
        super(props);

        this.state = {
            ready: false,
        };

        this._handleSuccess = this._handleSuccess.bind(this);
        this._handleError = this._handleError.bind(this);
        this.mounted = false;
    }

    public componentWillMount() {
        if (!this.props.images || !this.props.images.length) {
            this._handleSuccess();
        }
    }

    public componentDidMount() {
        this.mounted = true;
        if (!this.state.ready) {
            ImageHelper
                .loadImages(this.props.images)
                .then(this._handleSuccess, this._handleError);
            if (this.props.autoResolveDelay && this.props.autoResolveDelay > 0) {
                this.autoResolveTimeout = setTimeout(this._handleSuccess, this.props.autoResolveDelay);
            }
        }
    }

    public render() {
        return (this.state.ready && this.props.mountChildren ? this.props.children : this.props.loadingIndicator);
    }

    public componentWillUnmount() {
        this.mounted = false;
        if (this.autoResolveTimeout) {
            clearTimeout(this.autoResolveTimeout);
        }
    }

    private _handleSuccess() {
        if (this.autoResolveTimeout) {
            clearTimeout(this.autoResolveTimeout);
            console.warn('images failed to preload, auto resolving');
        }

        if (this.state.ready || !this.mounted) {
            return;
        }

        this.setState({
            ready: true,
        });

        if (this.props.onSuccess) {
            this.props.onSuccess();
        }
    }

    private _handleError(err) {

        if(!this.mounted) {
            return;
        }

        if (this.props.resolveOnError) {
            this._handleSuccess();
        }

        if (this.props.onError) {
            this.props.onError(err);
        }
    }
}
