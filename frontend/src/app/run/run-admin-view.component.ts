import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppConfig} from '../app.config';
import {
    CompetitionRunAdminService,
    CompetitionRunService,
    CompetitionService,
    RestDetailedTeam,
    RunInfo,
    RunState,
    ViewerInfo
} from '../../../openapi';
import {combineLatest, merge, Observable, of, Subject, timer} from 'rxjs';
import {catchError, filter, flatMap, map, shareReplay, switchMap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent, ConfirmationDialogComponentData} from '../shared/confirmation-dialog/confirmation-dialog.component';


export interface CombinedRun {
    info: RunInfo;
    state: RunState;
}

@Component({
    selector: 'app-run-admin-view',
    templateUrl: './run-admin-view.component.html',
    styleUrls: ['./run-admin-view.component.scss']
})
export class RunAdminViewComponent {

    runId: Observable<string>;
    run: Observable<CombinedRun>;
    viewers: Observable<ViewerInfo[]>;
    update = new Subject();
    displayedColumnsTasks: string[] = ['name', 'group', 'type', 'duration', 'action'];
    teams: Observable<RestDetailedTeam[]>;

    constructor(private router: Router,
                private activeRoute: ActivatedRoute,
                private config: AppConfig,
                private runService: CompetitionRunService,
                private competitionService: CompetitionService,
                private runAdminService: CompetitionRunAdminService,
                private snackBar: MatSnackBar,
                private dialog: MatDialog) {
        this.runId = this.activeRoute.params.pipe(map(a => a.runId));
        this.run = this.runId.pipe(
            switchMap(runId =>
                combineLatest([
                    this.runService.getApiRunInfoWithRunid(runId).pipe(
                        catchError((err, o) => {
                            console.log(`[RunAdminViewComponent] There was an error while loading information in the current run state: ${err?.message}`);
                            this.snackBar.open(`There was an error while loading information in the current run: ${err?.message}`);
                            if (err.status === 404) {
                                this.router.navigate(['/competition/list']);
                            }
                            return of(null);
                        }),
                        filter(q => q != null)
                    ),
                    merge(timer(0, 1000), this.update).pipe(
                        switchMap(index => this.runService.getApiRunStateWithRunid(runId))
                    )
                ])
            ),
            map(([i, s]) => {
                return {info: i, state: s} as CombinedRun;
            }),
            shareReplay({bufferSize: 1, refCount: true}) /* Cache last successful loading. */
        );


        this.viewers = this.runId.pipe(
            flatMap(runId => timer(0, 1000).pipe(switchMap(i => this.runAdminService.getApiRunAdminWithRunidViewerList(runId))))
        );

        this.teams = this.run.pipe(
            switchMap(runAndInfo => {
                return this.competitionService.getApiCompetitionWithCompetitionidTeamListDetails(runAndInfo.info.competitionId);
            }),
            shareReplay({bufferSize: 1, refCount: true})
        );

    }

    public start() {
        this.runId.pipe(switchMap(id => this.runAdminService.postApiRunAdminWithRunidStart(id))).subscribe(
            (r) => {
                this.update.next();
                this.snackBar.open(`Success: ${r.description}`, null, {duration: 5000});
            }, (r) => {
                this.snackBar.open(`Error: ${r.error.description}`, null, {duration: 5000});
            }
        );
    }

    public terminate() {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: {
                text: 'You are about to terminate this run. This action cannot be undone. Do you want to proceed?',
                color: 'warn'
            } as ConfirmationDialogComponentData
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.runId.pipe(switchMap(id => this.runAdminService.postApiRunAdminWithRunidTerminate(id))).subscribe(
                    (r) => {
                        this.update.next();
                        this.snackBar.open(`Success: ${r.description}`, null, {duration: 5000});
                    }, (r) => {
                        this.snackBar.open(`Error: ${r.error.description}`, null, {duration: 5000});
                    }
                );
            }
        });

    }

    public nextTask() {
        this.runId.pipe(switchMap(id => this.runAdminService.postApiRunAdminWithRunidTaskNext(id))).subscribe(
            (r) => {
                this.update.next();
                this.snackBar.open(`Success: ${r.description}`, null, {duration: 5000});
            }, (r) => {
                this.snackBar.open(`Error: ${r.error.description}`, null, {duration: 5000});
            }
        );
    }

    public previousTask() {
        this.runId.pipe(switchMap(id => this.runAdminService.postApiRunAdminWithRunidTaskPrevious(id))).subscribe(
            (r) => {
                this.update.next();
                this.snackBar.open(`Success: ${r.description}`, null, {duration: 5000});
            }, (r) => {
                this.snackBar.open(`Error: ${r.error.description}`, null, {duration: 5000});
            }
        );
    }

    public startTask() {
        this.runId.pipe(switchMap(id => this.runAdminService.postApiRunAdminWithRunidTaskStart(id))).subscribe(
            (r) => {
                this.update.next();
                this.snackBar.open(`Success: ${r.description}`, null, {duration: 5000});
            }, (r) => {
                this.snackBar.open(`Error: ${r.error.description}`, null, {duration: 5000});
            }
        );
    }

    public abortTask() {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: {
                text: 'Really abort the task?',
                color: 'warn'
            } as ConfirmationDialogComponentData
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.runId.pipe(switchMap(id => this.runAdminService.postApiRunAdminWithRunidTaskAbort(id))).subscribe(
                    (r) => {
                        this.update.next();
                        this.snackBar.open(`Success: ${r.description}`, null, {duration: 5000});
                    }, (r) => {
                        this.snackBar.open(`Error: ${r.error.description}`, null, {duration: 5000});
                    }
                );
            }
        });
    }

    public switchTask(idx: number) {
        this.runId.pipe(switchMap(id => this.runAdminService.postApiRunAdminWithRunidTaskSwitchWithIdx(id, idx))).subscribe(
            (r) => {
                this.update.next();
                this.snackBar.open(`Success: ${r.description}`, null, {duration: 5000});
            }, (r) => {
                this.snackBar.open(`Error: ${r.error.description}`, null, {duration: 5000});
            }
        );
    }

    public submissionsOf(task) {
        this.runId.subscribe(r => {
            this.router.navigateByUrl(`run/admin/submissions/${r}/${task.id}`);
        });
    }

    public adjustDuration(duration: number) {
        this.runId.pipe(switchMap(id => this.runAdminService.postApiRunAdminWithRunidAdjustWithDuration(id, duration))).subscribe(
            (r) => {
                this.update.next();
                this.snackBar.open(`Success: ${r.description}`, null, {duration: 5000});
            }, (r) => {
                this.snackBar.open(`Error: ${r.error.description}`, null, {duration: 5000});
            }
        );
    }

    public forceViewer(viewerId: string) {
        this.runId.pipe(switchMap(id => this.runAdminService.postApiRunAdminWithRunidViewersWithVieweridForce(id, viewerId))).subscribe(
            (r) => {
                this.update.next();
                this.snackBar.open(`Success: ${r.description}`, null, {duration: 5000});
            }, (r) => {
                this.snackBar.open(`Error: ${r.error.description}`, null, {duration: 5000});
            }
        );
    }

    public toFormattedTime(sec: number): string {
        const hours = Math.floor(sec / 3600);
        const minutes = Math.floor(sec / 60) % 60;
        const seconds = sec % 60;

        return [hours, minutes, seconds]
            .map(v => v < 10 ? '0' + v : v)
            .filter((v, i) => v !== '00' || i > 0)
            .join(':');
    }

    /**
     * Generates a URL for the logo of the team.
     */
    public teamLogo(team: RestDetailedTeam): string {
        return this.config.resolveApiUrl(`/competition/logo/${team.logoId}`);
    }

    userNameOf(user: string): Observable<string> {
        // if (user) {
        //     return this.userService.getApiUserWithId(user).pipe(
        //         map(u => u.username),
        //         shareReplay(1)
        //     );
        // } else {
        return null;
        // }
    }
}
